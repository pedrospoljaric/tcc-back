exports.up = (knex) => knex.schema.createTable('course_students', (table) => {
    table.integer('course_id').notNullable()
    table.integer('student_id').notNullable()

    table.foreign('course_id').references('id').on('courses')
    table.foreign('student_id').references('id').on('users')

    table.primary(['course_id', 'student_id'])
})

exports.down = (knex) => knex.schema.dropTable('course_students')
