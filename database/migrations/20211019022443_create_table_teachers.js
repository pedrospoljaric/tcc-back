exports.up = (knex) => knex.schema.createTable('teachers', (table) => {
    table.increments()
    table.text('name').notNullable()
    table.specificType('nicknames', 'TEXT[]').notNullable().defaultsTo('{}')
})

exports.down = (knex) => knex.schema.dropTable('teachers')
