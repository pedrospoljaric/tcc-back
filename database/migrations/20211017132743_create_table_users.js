exports.up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
        table.increments()
        table.text('name').notNullable()
        table.integer('registration_number').notNullable()
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('users')
}
