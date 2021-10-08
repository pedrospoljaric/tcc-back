exports.up = async (knex) => {
    await knex.schema.createTable('meeting_times', (table) => {
        table.increments()
        table.integer('day_of_the_week').notNullable()
        table.time('start_time').notNullable()
        table.time('end_time').notNullable()
    })

    await knex.table('meeting_times').insert({ day_of_the_week: 1, start_time: '8:00', end_time: '10:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 1, start_time: '10:00', end_time: '12:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 1, start_time: '13:30', end_time: '15:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 1, start_time: '15:30', end_time: '17:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 1, start_time: '19:00', end_time: '21:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 1, start_time: '21:00', end_time: '23:00' })

    await knex.table('meeting_times').insert({ day_of_the_week: 2, start_time: '8:00', end_time: '10:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 2, start_time: '10:00', end_time: '12:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 2, start_time: '13:30', end_time: '15:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 2, start_time: '15:30', end_time: '17:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 2, start_time: '19:00', end_time: '21:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 2, start_time: '21:00', end_time: '23:00' })

    await knex.table('meeting_times').insert({ day_of_the_week: 3, start_time: '8:00', end_time: '10:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 3, start_time: '10:00', end_time: '12:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 3, start_time: '13:30', end_time: '15:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 3, start_time: '15:30', end_time: '17:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 3, start_time: '19:00', end_time: '21:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 3, start_time: '21:00', end_time: '23:00' })

    await knex.table('meeting_times').insert({ day_of_the_week: 4, start_time: '8:00', end_time: '10:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 4, start_time: '10:00', end_time: '12:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 4, start_time: '13:30', end_time: '15:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 4, start_time: '15:30', end_time: '17:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 4, start_time: '19:00', end_time: '21:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 4, start_time: '21:00', end_time: '23:00' })

    await knex.table('meeting_times').insert({ day_of_the_week: 5, start_time: '8:00', end_time: '10:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 5, start_time: '10:00', end_time: '12:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 5, start_time: '13:30', end_time: '15:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 5, start_time: '15:30', end_time: '17:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 5, start_time: '19:00', end_time: '21:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 5, start_time: '21:00', end_time: '23:00' })

    await knex.table('meeting_times').insert({ day_of_the_week: 6, start_time: '8:00', end_time: '10:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 6, start_time: '10:00', end_time: '12:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 6, start_time: '13:30', end_time: '15:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 6, start_time: '15:30', end_time: '17:30' })
    await knex.table('meeting_times').insert({ day_of_the_week: 6, start_time: '19:00', end_time: '21:00' })
    await knex.table('meeting_times').insert({ day_of_the_week: 6, start_time: '21:00', end_time: '23:00' })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('meeting_times')
}
