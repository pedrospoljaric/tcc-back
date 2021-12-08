const { prop } = require('lodash/fp')
const db = require('../../database')
const getClasses = require('../classes/getClasses')

module.exports = async ({ courseId, semesterNumber, semesterId }) => {
    const disciplines = await db
        .select('D.id', 'D.name')
        .from('course_disciplines AS CD')
        .innerJoin('disciplines AS D', { 'CD.discipline_id': 'D.id' })
        .where({ 'CD.course_id': courseId, 'CD.semester_number': semesterNumber })

    const disciplineGroups = await db
        .select('DG.id', 'DG.name')
        .from('course_disciplines AS CD')
        .innerJoin('discipline_groups AS DG', { 'CD.discipline_group_id': 'DG.id' })
        .where({ 'CD.course_id': courseId, 'CD.semester_number': semesterNumber })

    const disciplinesIds = disciplines.map(prop('id'))

    const classes = await getClasses({ semesterId, disciplinesIds })

    return classes
}
