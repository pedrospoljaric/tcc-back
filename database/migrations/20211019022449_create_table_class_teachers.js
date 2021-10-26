exports.up = (knex) => knex.schema.createTable('class_teachers', (table) => {
    table.integer('class_id').notNullable()
    table.integer('teacher_id').notNullable()

    table.foreign('class_id').references('id').on('classes')
    table.foreign('teacher_id').references('id').on('teachers')

    table.primary(['class_id', 'teacher_id'])
})

exports.down = (knex) => knex.schema.dropTable('class_teachers')
