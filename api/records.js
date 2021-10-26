const express = require('express')

const { multer } = require('./middlewares')
const { submitRecordsFile } = require('#controllers/records')
const controllers = require('#controllers')

const router = express.Router()

module.exports = router
    .post('/', multer('file'), controllers(submitRecordsFile))
