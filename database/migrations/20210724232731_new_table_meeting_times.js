exports.up = (knex) => knex.schema.createTable('meeting_times', (table) => {
    table.increments()
    table.integer('day_of_the_week').notNullable()
    table.time('start_time').notNullable()
    table.time('end_time').notNullable()
})

exports.down = (knex) => knex.schema.dropTable('meeting_times')
