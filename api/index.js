const app = require('express')()
const health = require('./health')

app
    .get('/api/health', (req, res) => { res.send('oi') })

module.exports = app
