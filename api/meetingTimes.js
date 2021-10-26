const express = require('express')

const { getMeetingTimes } = require('#controllers/meetingTimes')
const controllers = require('#controllers')

const router = express.Router()

module.exports = router
    .get('/', controllers(getMeetingTimes))
