exports.up = async (knex) => {
    await knex.schema.createTable('semesters', (table) => {
        table.increments()
        table.integer('year').notNullable()
        table.integer('half').notNullable()

        table.unique(['year', 'half'])
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('semesters')
}
