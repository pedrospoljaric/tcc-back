const express = require('express')
const { getRecordsByUserCredentials } = require('../controllers/records')

// const {
//     authenticate
// } = require('./middlewares')

// const authentication = require('./authentication')

// const db = require('../database')

const router = express.Router()

router.post('/records', getRecordsByUserCredentials)

module.exports = router
