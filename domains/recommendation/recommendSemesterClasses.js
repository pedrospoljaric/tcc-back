const {
    prop, groupBy, orderBy, difference
} = require('lodash/fp')
const db = require('../../database')
const getClasses = require('../classes/getClasses')
const { getUserFulfilledDisciplinesIds } = require('../disciplines/utils')
const { getMostRecentSemester } = require('../semesters/utils')

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

module.exports = async ({
    userId, courseId
}) => {
    const mostRecentSemester = await getMostRecentSemester()
    const semesterId = prop('id', mostRecentSemester)

    const semesterDisciplinesIds = await db
        .pluck('discipline_id')
        .from('classes')
        .where({ semester_id: semesterId })
        .groupBy('discipline_id')

    const fulfilledDisciplinesIds = await getUserFulfilledDisciplinesIds(userId)

    const pickableDisciplinesIds = difference(semesterDisciplinesIds, fulfilledDisciplinesIds)

    const courseDisciplines = await db
        .select(
            'D.id', 'D.name',
            db.raw('ARRAY_REMOVE(ARRAY_AGG("DP".required_discipline_id), NULL) AS "requiredDisciplinesIds"')
        )
        .from('course_disciplines AS CD')
        .innerJoin('disciplines AS D', { 'CD.discipline_id': 'D.id' })
        .leftJoin('discipline_prerequisites AS DP', { 'D.id': 'DP.discipline_id' })
        .where({ 'CD.course_id': courseId })
        .whereIn('CD.discipline_id', pickableDisciplinesIds)
        .groupBy('D.id', 'CD.depth')
        .orderBy('CD.depth', 'DESC')

    const disciplines = []

    const disciplineAmountToPick = 5
    // Usar preferências do usuário para definir quantas disciplinas selecionar
    // Definir prioridades de disciplinas (grandes cadeias na sequência são mais importantes)
    // Usar lista de disciplinas disponíveis no semestre para não acabar selecionando alguma que não está disponível

    // Remover todas que já foram cursadas
    // Remover todas que possuem pré-requisitos não cumpridos
    // Adicionar disciplinas atrasadas
    // Se sobrar espaço, adicionar disciplinas adiantadas

    let disciplinesPicked = 0

    courseDisciplines.forEach((courseDiscipline) => {
        if (disciplinesPicked >= disciplineAmountToPick) return

        const requiredDisciplinesIds = prop('requiredDisciplinesIds', courseDiscipline)
        const requirementsAreFulfilled = requiredDisciplinesIds.every((disciplineId) => fulfilledDisciplinesIds.includes(disciplineId))
        if (!requirementsAreFulfilled) return

        disciplines.push(courseDiscipline)
        disciplinesPicked += 1
    })

    const { classes } = await getClasses({ userId, semesterId, disciplinesIds: disciplines.map(prop('id')) })

    const classesByDisciplineId = groupBy('discipline.id', classes)
    const classGroups = Object.values(classesByDisciplineId)

    const possibleGrids = classGroups.length ? permuteArrays(classGroups).map((classGroup) => ({ classes: classGroup })) : []
    const grids = (await Promise.all(possibleGrids.map(async (grid) => {
        try {
            return setGridScore(grid)
        } catch (err) {
            return null
        }
    }))).filter(Boolean)

    const gridsOrderedByScore = orderBy(['score'], ['desc'], grids)

    return {
        classes: prop('0.classes', gridsOrderedByScore)
    }
}
