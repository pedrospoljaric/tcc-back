const express = require('express')

const { getDisciplines } = require('#controllers/disciplines')
const controllers = require('#controllers')

const router = express.Router()

router
    .get('/', controllers(getDisciplines))

module.exports = router
