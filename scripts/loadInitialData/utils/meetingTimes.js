module.exports = (knex) => knex('meeting_times').insert([
    // Monday
    { day_of_the_week: 1, start_time: '8:00', end_time: '10:00' },
    { day_of_the_week: 1, start_time: '10:00', end_time: '12:00' },
    { day_of_the_week: 1, start_time: '13:30', end_time: '15:30' },
    { day_of_the_week: 1, start_time: '15:30', end_time: '17:30' },
    { day_of_the_week: 1, start_time: '19:00', end_time: '21:00' },
    { day_of_the_week: 1, start_time: '21:00', end_time: '23:00' },

    // Tuesday
    { day_of_the_week: 2, start_time: '8:00', end_time: '10:00' },
    { day_of_the_week: 2, start_time: '10:00', end_time: '12:00' },
    { day_of_the_week: 2, start_time: '13:30', end_time: '15:30' },
    { day_of_the_week: 2, start_time: '15:30', end_time: '17:30' },
    { day_of_the_week: 2, start_time: '19:00', end_time: '21:00' },
    { day_of_the_week: 2, start_time: '21:00', end_time: '23:00' },

    // Wedbesday
    { day_of_the_week: 3, start_time: '8:00', end_time: '10:00' },
    { day_of_the_week: 3, start_time: '10:00', end_time: '12:00' },
    { day_of_the_week: 3, start_time: '13:30', end_time: '15:30' },
    { day_of_the_week: 3, start_time: '15:30', end_time: '17:30' },
    { day_of_the_week: 3, start_time: '19:00', end_time: '21:00' },
    { day_of_the_week: 3, start_time: '21:00', end_time: '23:00' },

    // Thursday
    { day_of_the_week: 4, start_time: '8:00', end_time: '10:00' },
    { day_of_the_week: 4, start_time: '10:00', end_time: '12:00' },
    { day_of_the_week: 4, start_time: '13:30', end_time: '15:30' },
    { day_of_the_week: 4, start_time: '15:30', end_time: '17:30' },
    { day_of_the_week: 4, start_time: '19:00', end_time: '21:00' },
    { day_of_the_week: 4, start_time: '21:00', end_time: '23:00' },

    // Friday
    { day_of_the_week: 5, start_time: '8:00', end_time: '10:00' },
    { day_of_the_week: 5, start_time: '10:00', end_time: '12:00' },
    { day_of_the_week: 5, start_time: '13:30', end_time: '15:30' },
    { day_of_the_week: 5, start_time: '15:30', end_time: '17:30' },
    { day_of_the_week: 5, start_time: '19:00', end_time: '21:00' },
    { day_of_the_week: 5, start_time: '21:00', end_time: '23:00' },

    // Saturday
    { day_of_the_week: 6, start_time: '8:00', end_time: '10:00' },
    { day_of_the_week: 6, start_time: '10:00', end_time: '12:00' },
    { day_of_the_week: 6, start_time: '13:30', end_time: '15:30' },
    { day_of_the_week: 6, start_time: '15:30', end_time: '17:30' },
    { day_of_the_week: 6, start_time: '19:00', end_time: '21:00' },
    { day_of_the_week: 6, start_time: '21:00', end_time: '23:00' }
])
