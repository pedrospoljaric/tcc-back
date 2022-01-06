/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { prop } = require('lodash/fp')
const db = require('../database')

const disciplinesDepths = {}

const getDisciplineDepth = async (disciplineId) => {
    const disciplinePrerequisitesIds = await db.pluck('discipline_id').from('discipline_prerequisites').where({ required_discipline_id: disciplineId })

    let depth = 0
    for (const disciplinePrerequisiteId of disciplinePrerequisitesIds) {
        const prerequisiteDepth = disciplinesDepths[disciplinePrerequisiteId] || await getDisciplineDepth(disciplinePrerequisiteId)
        depth = Math.max(depth, prerequisiteDepth)
    }

    disciplinesDepths[disciplineId] = depth + 1

    return depth + 1
}

const setCourseDisciplinesDepth = async (courseId) => {
    const courseDisciplines = await db.select('*').from('course_disciplines').where({ course_id: courseId }).whereNotNull('discipline_id')
    const courseDisciplinesIds = courseDisciplines.map(prop('discipline_id'))

    for (const courseDisciplineId of courseDisciplinesIds) {
        await getDisciplineDepth(courseDisciplineId)
    }

    await db.raw(`
        UPDATE course_disciplines AS CD
        SET depth = D.depth
        FROM (VALUES
            ${Object.entries(disciplinesDepths).map((entry) => `(${entry})`).join(',')}
        ) AS D (discipline_id, depth)
        WHERE CD.discipline_id = D.discipline_id
    `)

    db.destroy()
}

setCourseDisciplinesDepth(1)
