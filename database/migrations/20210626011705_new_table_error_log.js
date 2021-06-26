exports.up = async (knex) => {
    await knex.schema.createTable('error_logs', (table) => {
        table.increments()
        table.text('message').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('error_logs')
}
