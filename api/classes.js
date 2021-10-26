const express = require('express')

const { createClasses } = require('#controllers/classes')
const controllers = require('#controllers')

const router = express.Router()

module.exports = router
    .post('/', controllers(createClasses))
