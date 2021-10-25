exports.up = (knex) => knex.schema.createTable('disciplines', (table) => {
    table.increments()
    table.text('name').notNullable().unique()
})

exports.down = (knex) => knex.schema.dropTable('disciplines')
