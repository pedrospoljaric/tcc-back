const db = require('../../database')

module.exports = async ({ userId }) => {
    const course = await db
        .select('CO.id', 'CO.name')
        .from('courses AS CO')
        .innerJoin('course_students AS CS', { 'CO.id': 'CS.course_id' })
        .where({ 'CS.student_id': userId })
        .first()

    return {
        course
    }
}
