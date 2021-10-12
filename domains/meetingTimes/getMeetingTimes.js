const db = require('#database')

module.exports = async () => {
    const meetingTimes = await db.select('id', 'day_of_the_week AS dayOfTheWeek', 'start_time AS startTime', 'end_time AS endTime').from('meeting_times').orderBy('id')

    return {
        meetingTimes
    }
}
