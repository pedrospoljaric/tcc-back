exports.up = async (knex) => {
    await knex.schema.createTable('discipline_prerequisites', (table) => {
        table.integer('discipline_id').notNullable()
        table.integer('required_discipline_id').notNullable()

        table.foreign('discipline_id').references('id').on('disciplines')
        table.foreign('required_discipline_id').references('id').on('disciplines')

        table.primary(['discipline_id', 'required_discipline_id'])
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('discipline_prerequisites')
}
