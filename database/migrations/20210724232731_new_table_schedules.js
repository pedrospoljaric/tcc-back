exports.up = async (knex) => {
    await knex.schema.createTable('schedules', (table) => {
        table.increments()
        table.integer('day').notNullable()
        table.time('start_time').notNullable()
        table.time('end_time').notNullable()
        table.boolean('verified').notNullable().defaultsTo(false)
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('schedules')
}
