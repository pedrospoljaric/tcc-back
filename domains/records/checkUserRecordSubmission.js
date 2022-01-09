const db = require('../../database')

module.exports = async ({ userId }) => {
    const anyClassCoursed = await db
        .select('*')
        .from('class_students')
        .where({ student_id: userId, fulfilled: true })
        .orWhere({ student_id: userId, fulfilled: false })
        .first()

    return {
        hasSubmittedRecords: !!anyClassCoursed
    }
}
