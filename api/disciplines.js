const express = require('express')

const { getDisciplines } = require('#controllers/disciplines')
const controllers = require('#controllers')

const router = express.Router()

module.exports = router
    .get('/', controllers(getDisciplines))
