const express = require('express')

const router = express.Router()

// const {
//     authenticate
// } = require('./middlewares')

// const authentication = require('./authentication')

const db = require('../database')

router.get('/teste', async (req, res) => {
    await db.table('users').insert({ name: req.query.name })
    const users = await db('users')

    res.json({
        dnv: process.env,
        users
    })
})

module.exports = router
