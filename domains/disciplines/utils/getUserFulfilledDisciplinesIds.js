const db = require('../../../database')

module.exports = (userId) => db
    .pluck('C.discipline_id')
    .from('class_students AS CS')
    .innerJoin('classes AS C', { 'CS.class_id': 'C.id' })
    .where({ 'CS.student_id': userId, 'CS.fulfilled': true })
