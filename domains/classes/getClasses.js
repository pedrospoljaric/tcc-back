const { prop } = require('lodash/fp')
const db = require('../../database')
const { getUserFulfilledDisciplinesIds } = require('../disciplines/utils')
const { getMostRecentSemester } = require('../semesters/utils')
const { getClassesByIds } = require('./utils')

module.exports = async ({ userId, semesterId, disciplinesIds }) => {
    const mostRecentSemester = await getMostRecentSemester()

    const fulfilledDisciplinesIds = await getUserFulfilledDisciplinesIds(userId)

    const lockedDisciplinesIds = await db
        .pluck('discipline_id')
        .from('discipline_prerequisites')
        .whereNotIn('required_discipline_id', fulfilledDisciplinesIds)
        .groupBy('discipline_id')

    const classesIds = await db
        .with('user_fullfilled_disciplines', db
            .select('C.discipline_id')
            .from('class_students AS CS')
            .innerJoin('classes AS C', { 'CS.class_id': 'C.id' })
            .where({ 'CS.student_id': userId }))
        .pluck('C.id')
        .from('classes AS C')
        .leftJoin('user_fullfilled_disciplines AS UFD', { 'C.discipline_id': 'UFD.discipline_id' })
        .where({ 'C.semester_id': semesterId || prop('id', mostRecentSemester) })
        .whereNotIn('C.discipline_id', fulfilledDisciplinesIds)
        .whereNotIn('C.discipline_id', lockedDisciplinesIds)
        .modify((query) => {
            if (disciplinesIds) query.whereIn('C.discipline_id', disciplinesIds)
        })
        .groupBy('C.id')

    const classes = await getClassesByIds(classesIds)

    return {
        classes
    }
}
