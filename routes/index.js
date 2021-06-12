const express = require('express')

const router = express.Router()

// const {
//     authenticate
// } = require('./middlewares')

// const authentication = require('./authentication')

router.get('/teste', (req, res) => { res.json({ hello: 'world' }) })

module.exports = router
