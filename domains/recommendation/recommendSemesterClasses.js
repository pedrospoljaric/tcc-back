const {
    prop, isEmpty, intersection, groupBy, orderBy
} = require('lodash/fp')
const db = require('../../database')
const getClasses = require('../classes/getClasses')

const permuteArrays = (arrays, index = 0) => {
    if (index === arrays.length - 1) return arrays[index].map((item) => [item])

    const previousCombinations = permuteArrays(arrays, index + 1)
    const newCombinations = arrays[index].flatMap((item) => previousCombinations.map((combination) => [item, ...combination]))
    return newCombinations
}

const dayOfTheWeekToIndex = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5
}

const startTimeToIndex = {
    '8:00:00': 0,
    '10:00:00': 1,
    '13:30:00': 2,
    '15:30:00': 3,
    '19:00:00': 4,
    '21:00:00': 5
}

const setGridScore = (grid) => {
    const { classes } = grid
    let score = 0

    const matrix = Array(6).fill().map(() => Array(6).fill(0))

    classes.forEach((currentClass) => {
        (prop('meetingTimes', currentClass) || []).forEach((meetingTime) => {
            const dayOfTheWeek = prop('dayOfTheWeek', meetingTime)
            const startTime = prop('startTime', meetingTime)

            const dayIndex = dayOfTheWeekToIndex[dayOfTheWeek]
            const timeIndex = startTimeToIndex[startTime]
            if (matrix[dayIndex][timeIndex]) throw new Error('Invalid grid')
            matrix[dayIndex][timeIndex] = 1
        })
    })

    for (let i = 0; i < 6; i += 1) {
        for (let j = 0; j < 6; j += 1) {
            if (matrix[i][j]) {
                const isStartOfPeriod = j % 2 === 0
                const neighborIndex = isStartOfPeriod ? j + 1 : j - 1

                score
                    += matrix[(i + 1) % 6][j]
                    + matrix[(i + 2) % 6][j]
                    + matrix[(i + 3) % 6][j]
                    + matrix[(i + 4) % 6][j]
                    + matrix[(i + 5) % 6][j]

                    + matrix[0][neighborIndex]
                    + matrix[1][neighborIndex]
                    + matrix[2][neighborIndex]
                    + matrix[3][neighborIndex]
                    + matrix[4][neighborIndex]
                    + matrix[5][neighborIndex]

                    + 2 * matrix[i][(j + 1) % 6]
                    + 2 * matrix[i][(j + 2) % 6]
                    + 2 * matrix[i][(j + 3) % 6]
                    + 2 * matrix[i][(j + 4) % 6]
                    + 2 * matrix[i][(j + 5) % 6]
            }
        }
    }

    return {
        ...grid,
        score
    }
}

module.exports = async ({ courseId, semesterNumber, semesterId }) => {
    const disciplines = await db
        .select('D.id', 'D.name')
        .from('course_disciplines AS CD')
        .innerJoin('disciplines AS D', { 'CD.discipline_id': 'D.id' })
        .where({ 'CD.course_id': courseId, 'CD.semester_number': semesterNumber })

    // const disciplineGroups = await db
    //     .select('DG.id', 'DG.name')
    //     .from('course_disciplines AS CD')
    //     .innerJoin('discipline_groups AS DG', { 'CD.discipline_group_id': 'DG.id' })
    //     .where({ 'CD.course_id': courseId, 'CD.semester_number': semesterNumber })

    const disciplinesIds = disciplines.map(prop('id'))

    const { classes } = await getClasses({ semesterId, disciplinesIds })

    // const priorityOrderedDisciplinesIds = await db
    //     .pluck('D.id')
    //     .from('classes AS C')
    //     .innerJoin('disciplines AS D', { 'C.discipline_id': 'D.id' })
    //     .whereIn('D.id', disciplinesIds)
    //     .groupBy('D.id')
    //     .orderByRaw('COUNT(*)')

    const classesByDisciplineId = groupBy('discipline.id', classes)
    const classGroups = Object.values(classesByDisciplineId)

    const possibleGrids = permuteArrays(classGroups).map((classGroup) => ({ classes: classGroup }))
    const grids = (await Promise.all(possibleGrids.map(async (grid) => {
        try {
            return setGridScore(grid)
        } catch (err) {
            return null
        }
    }))).filter(Boolean)

    const gridsOrderedByScore = orderBy(['score'], ['desc'], grids)

    // const pickedMeetingTimesIds = []

    // const pickedClasses = priorityOrderedDisciplinesIds.map((disciplineId) => {
    //     const disciplineClasses = classes
    //         .filter((classItem) => prop('discipline.id', classItem) === disciplineId)
    //         .filter((classItem) => isEmpty(intersection(prop('meetingTimes', classItem).map(prop('id')), pickedMeetingTimesIds)))

    //     const [pickedClass] = disciplineClasses
    //     pickedMeetingTimesIds.push(...prop('meetingTimes', pickedClass).map(prop('id')))
    //     return pickedClass
    // })

    return {
        classes: prop('0.classes', gridsOrderedByScore)
    }
}
