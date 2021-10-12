const { getMeetingTimes } = require('#domains/meetingTimes')

module.exports = () => ({
    method: getMeetingTimes
})
