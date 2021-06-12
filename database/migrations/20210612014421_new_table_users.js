exports.up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
        table.increments()
        table.text('name')
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('users')
}
