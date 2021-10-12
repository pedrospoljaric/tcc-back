/* eslint-disable no-restricted-syntax */
const { prop } = require('lodash/fp')
const db = require('#database')

module.exports = async ({ semesterName, classes }) => {
    await db.transaction(async (trx) => {
        const [semester] = await trx.table('semesters').insert({ name: semesterName }).returning('*')

        const insertedClasses = await trx.table('classes').insert(classes.map((classInfo) => ({
            name: prop('name', classInfo),
            discipline_id: prop('disciplineId', classInfo) || 1,
            semester_id: prop('id', semester)
        }))).returning('*')

        const classesReference = {}
        for (const insertedClass of insertedClasses) {
            classesReference[`${insertedClass.name}-${insertedClass.discipline_id}-${prop('id', semester)}`] = insertedClass.id
        }

        await trx.table('class_meeting_times').insert(classes.map((newClass) => {
            let stop
            return {
                class_id: classesReference[`${newClass.name}-${newClass.disciplineId || 1}-${prop('id', semester)}`],
                meeting_time_id: newClass.meetingTimeId
            }
        }))
    })
}
