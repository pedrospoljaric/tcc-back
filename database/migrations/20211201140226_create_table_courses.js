exports.up = (knex) => knex.schema.createTable('courses', (table) => {
    table.increments()
    table.text('name').notNullable().unique()
})

exports.down = (knex) => knex.schema.dropTable('courses')
