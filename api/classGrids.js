const express = require('express')

const { multer } = require('./middlewares')
const { importClassGrid } = require('#controllers/classGrids')
const controllers = require('#controllers')

const router = express.Router()

module.exports = router
    .post('/import', multer('file'), controllers(importClassGrid))
