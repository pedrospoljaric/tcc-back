exports.up = async (knex) => {
    await knex.schema.createTable('class_schedules', (table) => {
        table.integer('class_id').notNullable()
        table.integer('schedule_id').notNullable()

        table.foreign('class_id').references('id').on('classes')
        table.foreign('schedule_id').references('id').on('schedules')

        table.primary(['class_id', 'schedule_id'])
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('class_schedules')
}
