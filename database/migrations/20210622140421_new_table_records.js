exports.up = async (knex) => {
    await knex.schema.createTable('records', (table) => {
        table.increments()
        table.jsonb('header_data')
        table.jsonb('entries')
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('records')
}
