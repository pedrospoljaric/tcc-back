const db = require('../../database')

module.exports = async ({ userId, classesIds }) => {
    await db.transaction(async (trx) => {
        await trx
            .table('student_selected_classes')
            .where({ student_id: userId })
            .del()

        await trx
            .table('student_selected_classes')
            .insert(classesIds.map((classId) => ({
                student_id: userId,
                class_id: classId
            })))
    })
}
