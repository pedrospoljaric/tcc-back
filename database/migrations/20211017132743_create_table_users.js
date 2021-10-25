exports.up = (knex) => knex.schema.createTable('users', (table) => {
    table.increments()
    table.text('name').notNullable()
    table.integer('registration_number').notNullable()
})

exports.down = (knex) => knex.schema.dropTable('users')
