/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { keyBy, prop, isNaN } = require('lodash/fp')
const db = require('../../database')
const { getUserRecordsFromFile } = require('./utils')

const recordStatusToFulfilled = {
    APROVADO: true,
    CUMPRIDO: true,
    'EM CURSO': null,
    REPROVADO: false,
    'NÃO CUMPRIDO': false
}

module.exports = async ({ userId, file }) => {
    const { courseName, records } = await getUserRecordsFromFile({ file })

    const semesters = await db.select('*').from('semesters')
    const semestersReference = {}
    for (const semester of semesters) {
        semestersReference[`${semester.year}-${semester.half}`] = semester.id
    }

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

    const classStudents = []
    await db.transaction(async (trx) => {
        if (courseName.includes('ENGENHARIA DE COMPUTAÇÃO')) {
            const computerEngineeringCouse = await db('courses').where({ name: 'Engenharia de Computação' }).first()

            await trx
                .table('course_students')
                .insert({ course_id: prop('id', computerEngineeringCouse), student_id: userId })
                .onConflict(['course_id', 'student_id'])
                .ignore()
        }

        for (const record of records) {
            const year = prop('year', record)
            const half = prop('semester', record)
            const className = prop('class_name', record)
            const disciplineName = prop('discipline_name', record)
            let disciplineId = prop(`${disciplineName}.id`, disciplinesReference)

            let semester = semestersReference[`${year}-${half}`]

            if (!semester) {
                const [newSemester] = await trx.table('semesters').insert({ year, half }).returning('*')
                semestersReference[`${year}-${half}`] = prop('id', newSemester)
                semester = prop('id', newSemester)
            }

            if (!disciplineId) {
                const [newDiscipline] = await trx.table('disciplines').insert({ name: disciplineName }).returning('*')
                disciplinesReference[`${disciplineName}`] = { id: prop('id', newDiscipline) }
                disciplineId = prop('id', newDiscipline)
            }

            let classInfo = classesReference[`${className}-${disciplineId}-${semester}`]

            if (!classInfo) {
                const [newClass] = await trx.table('classes').insert({
                    name: className,
                    discipline_id: disciplineId,
                    semester_id: semester
                }).returning('*')
                classesReference[`${className}-${disciplineId}-${semester}`] = prop('id', newClass)
                classInfo = prop('id', newClass)
            }

            classStudents.push({
                class_id: classInfo,
                student_id: userId,
                grade: Number((record.grade || '').replace(',', '.')) || null,
                absences: isNaN(Number(record.absences)) ? null : Number(record.absences),
                fulfilled: recordStatusToFulfilled[prop('status', record)]
            })
        }

        await trx.table('class_students').insert(classStudents).onConflict(['class_id', 'student_id']).ignore()
    })

    return {
        classes: classStudents
    }
}
