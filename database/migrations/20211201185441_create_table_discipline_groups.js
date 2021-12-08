exports.up = (knex) => knex.schema.createTable('discipline_groups', (table) => {
    table.increments()
    table.text('name').notNullable().unique()
})

exports.down = (knex) => knex.schema.dropTable('discipline_groups')
