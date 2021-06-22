exports.up = async (knex) => {
    await knex.schema.createTable('records', (table) => {
        table.increments()
        table.integer('user_ra')
        table.jsonb('json_data')

        table.unique('user_ra')
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('records')
}
