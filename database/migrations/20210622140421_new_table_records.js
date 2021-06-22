exports.up = async (knex) => {
    await knex.schema.createTable('records', (table) => {
        table.increments()
        table.text('user_hash')
        table.jsonb('json_data')

        table.unique('user_ra')
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('records')
}
