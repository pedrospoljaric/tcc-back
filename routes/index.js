const express = require('express')

const router = express.Router()

// const {
//     authenticate
// } = require('./middlewares')

// const authentication = require('./authentication')

// const db = require('../database')

const { getRecordsByUserCredentials } = require('../controllers/records')

router.get('/records', getRecordsByUserCredentials)

module.exports = router
