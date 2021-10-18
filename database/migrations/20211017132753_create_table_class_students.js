exports.up = async (knex) => {
    await knex.schema.createTable('class_students', (table) => {
        table.integer('class_id').notNullable()
        table.integer('student_id').notNullable()
        table.float('grade')
        table.float('absences')

        table.foreign('class_id').references('id').on('classes')
        table.foreign('student_id').references('id').on('users')

        table.primary(['class_id', 'meeting_time_id'])
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('class_students')
}
