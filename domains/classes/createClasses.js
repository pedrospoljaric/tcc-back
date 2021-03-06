/* eslint-disable no-restricted-syntax */
const { prop } = require('lodash/fp')
const db = require('../../database')

module.exports = async ({ year, half, classes }) => {
    await db.transaction(async (trx) => {
        const [semester] = await trx.table('semesters').insert({ year, half }).returning('*')

        const insertedClasses = await trx.table('classes').insert(classes.map((classInfo) => ({
            name: prop('name', classInfo),
            discipline_id: prop('disciplineId', classInfo),
            semester_id: prop('id', semester)
        })))
            .onConflict(['name', 'discipline_id', 'semester_id'])
            .ignore()
            .returning('*')

        const classesReference = {}
        for (const insertedClass of insertedClasses) {
            classesReference[`${prop('name', insertedClass)}-${insertedClass.discipline_id}-${prop('id', semester)}`] = insertedClass.id
        }
        await trx.table('class_meeting_times').insert(classes.map((newClass) => ({
            class_id: classesReference[`${newClass.name}-${newClass.disciplineId || 1}-${prop('id', semester)}`],
            meeting_time_id: newClass.meetingTimeId
        })))

        await trx.table('class_teachers').insert(classes.reduce((classTeachers, newClass) => [
            ...classTeachers,
            ...newClass.teachersIds.map((teacherId) => ({
                class_id: classesReference[`${newClass.name}-${newClass.disciplineId || 1}-${prop('id', semester)}`],
                teacher_id: teacherId
            }))
        ], []))
            .onConflict(['class_id', 'teacher_id'])
            .ignore()
    })
}
