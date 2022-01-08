exports.up = (knex) => knex.schema.createTable('student_selected_classes', (table) => {
    table.integer('student_id').notNullable()
    table.integer('class_id').notNullable()

    table.foreign('student_id').references('id').on('users')
    table.foreign('class_id').references('id').on('classes')

    table.primary(['student_id', 'class_id'])
})

exports.down = (knex) => knex.schema.dropTable('student_selected_classes')
