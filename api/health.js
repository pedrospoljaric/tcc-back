const app = require('express')()

app
    .get('/api/health', (req, res) => {
        res.end('healthy')
    })

module.exports = app
