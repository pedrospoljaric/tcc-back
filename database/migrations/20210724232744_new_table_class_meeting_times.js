exports.up = async (knex) => {
    await knex.schema.createTable('class_meeting_times', (table) => {
        table.integer('class_id').notNullable()
        table.integer('meeting_time_id').notNullable()

        table.foreign('class_id').references('id').on('classes')
        table.foreign('meeting_time_id').references('id').on('meeting_times')

        table.primary(['class_id', 'meeting_time_id'])
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('class_meeting_times')
}
