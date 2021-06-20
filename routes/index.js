const express = require('express')

const router = express.Router()

// const {
//     authenticate
// } = require('./middlewares')

// const authentication = require('./authentication')

// const db = require('../database')

const teste = require('../domains/teste')

router.get('/teste', async (req, res) => {
    // await db.table('users').insert({ name: req.query.name })
    // const users = await db('users')

    teste(req.query).then(res.json).catch(res.send)
})

module.exports = router
