const meetingTimes = require('./fixtures/meetingTimes.json')

exports.seed = (knex) => knex('meeting_times').insert(meetingTimes)
