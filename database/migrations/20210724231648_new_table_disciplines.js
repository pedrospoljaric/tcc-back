exports.up = async (knex) => {
    await knex.schema.createTable('disciplines', (table) => {
        table.increments()
        table.text('name').notNullable()
        table.specificType('aliases', 'TEXT ARRAY').notNullable()
        table.boolean('verified').notNullable().defaultsTo(false)
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('disciplines')
}
