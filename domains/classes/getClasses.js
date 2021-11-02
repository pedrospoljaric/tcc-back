const { prop, keyBy } = require('lodash/fp')
const db = require('../../database')

module.exports = async ({ semesterId }) => {
    const classes = await db
        .select(
            'C.id', 'C.name',
            db.raw(`JSON_BUILD_OBJECT(
                'id', "D".id,
                'name', "D".name
            ) AS discipline`),
            db.raw(`JSON_AGG(JSON_BUILD_OBJECT(
                'id', "MT".id,
                'dayOfTheWeek', "MT".day_of_the_week,
                'startTime', "MT".start_time,
                'endTime', "MT".end_time
            )) AS "meetingTimes"`)
        )
        .from('classes AS C')
        .innerJoin('disciplines AS D', { 'C.discipline_id': 'D.id' })
        .leftJoin('class_meeting_times AS CMT', { 'C.id': 'CMT.class_id' })
        .leftJoin('meeting_times AS MT', { 'CMT.meeting_time_id': 'MT.id' })
        .modify((query) => {
            if (semesterId) query.where({ 'C.semester_id': semesterId })
        })
        .groupBy('C.id', 'D.id')
        .orderBy('D.name')
        .orderBy('C.name')

    const classesIds = classes.map(prop('id'))

    const classesTeachers = await db
        .select(
            'CT.class_id',
            db.raw(`JSON_AGG(JSON_BUILD_OBJECT(
                'id', "T".id,
                'name', "T".name
            )) AS "teachers"`)
        )
        .from('class_teachers AS CT')
        .innerJoin('teachers AS T', { 'CT.teacher_id': 'T.id' })
        .whereIn('CT.class_id', classesIds)
        .groupBy('CT.class_id')

    const classesTeachersReference = keyBy('class_id', classesTeachers)

    const classesWithTeachers = classes.map((classroom) => ({
        ...classroom,
        teachers: prop(`${prop('id', classroom)}.teachers`, classesTeachersReference)
    }))

    return {
        classes: classesWithTeachers
    }
}
