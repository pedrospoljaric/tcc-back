const { prop, isEmpty, intersection } = require('lodash/fp')
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

    const { classes } = await getClasses({ semesterId, disciplinesIds })

    const priorityOrderedDisciplinesIds = await db
        .pluck('D.id')
        .from('classes AS C')
        .innerJoin('disciplines AS D', { 'C.discipline_id': 'D.id' })
        .whereIn('D.id', disciplinesIds)
        .groupBy('D.id')
        .orderByRaw('COUNT(*)')

    const pickedMeetingTimesIds = []

    const pickedClasses = priorityOrderedDisciplinesIds.map((disciplineId) => {
        const disciplineClasses = classes
            .filter((classItem) => prop('discipline.id', classItem) === disciplineId)
            .filter((classItem) => isEmpty(intersection(prop('meetingTimes', classItem).map(prop('id')), pickedMeetingTimesIds)))

        const [pickedClass] = disciplineClasses
        pickedMeetingTimesIds.push(...prop('meetingTimes', pickedClass).map(prop('id')))
        return pickedClass
    })

    return {
        classes: pickedClasses
    }
}
