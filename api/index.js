const express = require('express')
const classGrids = require('./classGrids')
const disciplines = require('./disciplines')
const meetingTimes = require('./meetingTimes')
const classes = require('./classes')
const records = require('./records')
const authentication = require('./authentication')
const teachers = require('./teachers')

const router = express.Router()

router
    .use('/authentication', authentication)
    .use('/grids', classGrids)
    .use('/disciplines', disciplines)
    .use('/meeting-times', meetingTimes)
    .use('/classes', classes)
    .use('/records', records)
    .use('/teachers', teachers)

module.exports = router
