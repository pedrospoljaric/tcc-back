/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const {
    prop, groupBy, orderBy, difference, intersection
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

const setGridScore = (grid, preferredMeetingTimesIds, classesWithFriendsIds) => {
    const { classes } = grid
    let score = 0

    const matrix = Array(6).fill().map(() => Array(6).fill(0))
    let gridCharge = 0

    classes.forEach((currentClass) => {
        (prop('meetingTimes', currentClass) || []).forEach((meetingTime) => {
            gridCharge += 1
            const dayOfTheWeek = prop('dayOfTheWeek', meetingTime)
            const startTime = prop('startTime', meetingTime)

            const dayIndex = dayOfTheWeekToIndex[dayOfTheWeek]
            const timeIndex = startTimeToIndex[startTime]
            if (matrix[dayIndex][timeIndex]) throw new Error('Invalid grid')
            matrix[dayIndex][timeIndex] = 1

            if (preferredMeetingTimesIds.includes(prop('id', meetingTime))) score += 1
        })

        if (classesWithFriendsIds.includes(prop('id', currentClass))) score += 1
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
        score: gridCharge ? (score / gridCharge) : 0
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

    const preferences = prop('preferences', await db
        .select('preferences')
        .from('users')
        .where({ id: userId })
        .first())

    const disciplineAmountToPick = prop('amount', preferences) || 5

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

    let possibleGrids = classGroups.length ? permuteArrays(classGroups).map((classGroup) => ({ classes: classGroup })) : []

    if (disciplinesPicked < disciplineAmountToPick) {
        const courseGroupsFulfilled = await db
            .select('DGD.discipline_group_id AS groupId', db.raw('COUNT(*)::INTEGER AS amount'))
            .from('discipline_group_disciplines AS DGD')
            .whereIn('DGD.discipline_id', fulfilledDisciplinesIds)
            .groupBy('DGD.discipline_group_id')
        const fulfilledAmountByGroupId = courseGroupsFulfilled.reduce((acc, cur) => ({ ...acc, [cur.groupId]: cur.amount }), {})

        const courseGroupsAmounts = await db
            .select('DG.id AS groupId', db.raw('COUNT(*) AS amount'))
            .from('course_disciplines AS CD')
            .innerJoin('discipline_groups AS DG', { 'CD.discipline_group_id': 'DG.id' })
            .where({ 'CD.course_id': courseId })
            .whereNot({ 'DG.name': 'Eletivas livres' })
            .groupBy('DG.id')
        const missingAmountByGroupId = courseGroupsAmounts.reduce((acc, cur) => (fulfilledAmountByGroupId[cur.groupId] >= cur.amount ? acc : ({ ...acc, [cur.groupId]: Math.max(0, cur.amount - (fulfilledAmountByGroupId[cur.groupId] || 0)) })), {})

        const groupsIds = Object.keys(missingAmountByGroupId).map(Number)
        const groupsClasses = []
        for (const groupId of groupsIds) {
            const groupPickableDisciplinesIds = await db
                .pluck('discipline_id')
                .from('discipline_group_disciplines')
                .where({ discipline_group_id: groupId })
                .whereIn('discipline_id', pickableDisciplinesIds)

            const { classes: groupClasses } = await getClasses({ userId, semesterId, disciplinesIds: groupPickableDisciplinesIds })

            groupsClasses.push(...groupClasses.map((groupClass) => ({ ...groupClass, groupId })))
        }

        const arraysToPermute = Array(disciplineAmountToPick - disciplinesPicked).fill().map(() => groupsClasses)
        const combinations = permuteArrays(arraysToPermute)

        const combinationsWithMergedClasses = combinations.map((combinationClasses) => Object.values(groupBy('id', combinationClasses)).map((arr) => arr[0]))

        const possibleCombinations = combinationsWithMergedClasses.filter((combinationClasses) => {
            const classesGroupedByGroupId = groupBy('groupId', combinationClasses)
            const combinationGroups = Object.keys(classesGroupedByGroupId).map((groupId) => ({ groupId, amount: classesGroupedByGroupId[groupId].length }))
            const classAmountByGroupId = combinationGroups.reduce((acc, cur) => ({ ...acc, [cur.groupId]: cur.amount }), {})

            const groupsAmountsFit = courseGroupsAmounts.reduce((keep, group) => keep && ((classAmountByGroupId[group.groupId] || 0) <= (missingAmountByGroupId[group.groupId] || 0)), true)

            const classesGroupedByDisciplineId = groupBy('discipline.id', combinationClasses)
            const hasUniqueDisciplines = Object.keys(classesGroupedByDisciplineId).reduce((keep, disciplineId) => keep && (classesGroupedByDisciplineId[disciplineId].length === 1), true)

            return groupsAmountsFit && hasUniqueDisciplines
        })

        if (possibleCombinations.length) {
            possibleGrids = permuteArrays([possibleGrids, possibleCombinations]).map(([grid, combination]) => ({ classes: [...grid.classes, ...combination] }))
        }
    }

    const existingMeetingTimes = await db('meeting_times')
    const meetingTimesIdsByDayAndTime = existingMeetingTimes.reduce((obj, meetingTime) => ({ ...obj, [`${prop('day_of_the_week', meetingTime)}-${prop('start_time', meetingTime)}`]: prop('id', meetingTime) }), {})

    const meetingTimePreferencesToIds = (preferenceDays = []) => {
        const days = Object.keys(preferenceDays)
        const meetingTimesIds = []
        days.forEach((day) => {
            preferenceDays[day].forEach((period) => {
                const firstTime = period === 'manha' ? '08:00:00'
                    : period === 'tarde' ? '13:30:00'
                        : period === 'noite' ? '19:00:00'
                            : null

                const secondTIme = period === 'manha' ? '10:00:00'
                    : period === 'tarde' ? '15:30:00'
                        : period === 'noite' ? '21:00:00'
                            : null

                meetingTimesIds.push(...[
                    meetingTimesIdsByDayAndTime[`${day}-${firstTime}`],
                    meetingTimesIdsByDayAndTime[`${day}-${secondTIme}`]
                ])
            })
        })
        return meetingTimesIds
    }

    const blockedMeetingTimesIds = meetingTimePreferencesToIds(prop('cant', preferences))
    const preferredMeetingTimesIds = meetingTimePreferencesToIds(prop('prefer', preferences))

    const allowedGrids = possibleGrids.map((grid) => {
        const fixedGrid = { ...grid }

        fixedGrid.classes = grid.classes.filter((gridClass) => {
            const gridClassMeetingTimesIds = (gridClass.meetingTimes || []).map(prop('id'))

            if (intersection(gridClassMeetingTimesIds, blockedMeetingTimesIds).length) return false
            return true
        })

        return fixedGrid
    }).filter((grid) => grid.classes.length)

    const classesWithFriendsIds = await db
        .pluck('C.id')
        .from('user_friends AS UF')
        .innerJoin('student_selected_classes AS SSC', { 'UF.friend_id': 'SSC.student_id' })
        .innerJoin('classes AS C', { 'SSC.class_id': 'C.id' })
        .where({ 'UF.user_id': userId })
        .where({ 'C.semester_id': semesterId })
        .groupBy('C.id')

    const grids = (await Promise.all(allowedGrids.map(async (grid) => {
        try {
            return setGridScore(grid, preferredMeetingTimesIds, classesWithFriendsIds)
        } catch (err) {
            return null
        }
    }))).filter(Boolean)

    const gridsOrderedByScore = orderBy(['score'], ['desc'], grids)

    return {
        classes: prop('0.classes', gridsOrderedByScore)
    }
}
