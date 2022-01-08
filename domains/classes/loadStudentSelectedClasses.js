const db = require('../../database')
const { getClassesByIds } = require('./utils')

module.exports = async ({ userId }) => {
    const classesIds = await db
        .pluck('class_id')
        .from('student_selected_classes')
        .where({ student_id: userId })

    const classes = await getClassesByIds(classesIds)

    return {
        classes
    }
}
