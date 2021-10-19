/* eslint-disable no-restricted-syntax */
const { keyBy, prop, isNaN } = require('lodash/fp')
const db = require('#database')
const { getUserRecordsFromFile } = require('./utils')

module.exports = async ({ userId, file }) => {
    const records = await getUserRecordsFromFile({ file })

    const semesters = await db.select('*').from('semesters')
    const semestersReference = {}
    semestersReference['2021-1'] = { id: 1 }
    semestersReference['2021-2'] = { id: 2 }
    // for (const semester of semesters) {
    //     semestersReference[`${semester.year}-${semester.half}`] = semester.id
    // }

    const disciplines = await db.select('*').from('disciplines')
    const disciplinesReference = keyBy('name', disciplines.map((discipline) => ({
        ...discipline,
        name: discipline.name.toUpperCase()
    })))

    const classes = await db.select('*').from('classes')
    const classesReference = {}
    for (const classInfo of classes) {
        classesReference[`${classInfo.name}-${classInfo.discipline_id}-${classInfo.semester_id}`] = classInfo.id
    }

    const classStudents = records.map((record) => {
        let stop
        return {
            class_id: classesReference[`${record.class_name}-${prop('id', disciplinesReference[record.discipline_name])}-${prop('id', semestersReference[`${record.year}-${record.semester}`])}`],
            student_id: userId,
            grade: Number((record.grade || '').replace(',', '.')) || null,
            absences: isNaN(Number(record.absences)) ? null : Number(record.absences)
        }
    })

    return {
        classes: records
    }
}
