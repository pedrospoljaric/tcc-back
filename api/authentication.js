const express = require('express')

const { authenticate } = require('#controllers/authentication')
const controllers = require('#controllers')

const router = express.Router()

module.exports = router
    .post('/', controllers(authenticate))
