const Router = require('./router')

const { getMeetingTimes } = require('#controllers/meetingTimes')

module.exports = new Router()
    .get('/', getMeetingTimes)
    .routes()
