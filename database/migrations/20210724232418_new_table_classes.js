exports.up = async (knex) => {
    await knex.schema.createTable('classes', (table) => {
        table.increments()
        table.text('name').notNullable()
        table.integer('discipline_id').notNullable()
        table.integer('semester_id').notNullable()

        table.foreign('discipline_id').references('id').on('disciplines')
        table.foreign('semester_id').references('id').on('semesters')
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('classes')
}
