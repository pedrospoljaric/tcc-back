const express = require('express')

const { getTeachers } = require('#controllers/teachers')
const controllers = require('#controllers')

const router = express.Router()

module.exports = router
    .get('/', controllers(getTeachers))
