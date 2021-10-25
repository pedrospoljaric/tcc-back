exports.up = (knex) => knex.schema.createTable('semesters', (table) => {
    table.increments()
    table.integer('year').notNullable()
    table.integer('half').notNullable()

    table.unique(['year', 'half'])
})

exports.down = (knex) => knex.schema.dropTable('semesters')
