const app = require('express')()

app
    .get('/', (req, res) => {
        res.end('healthy')
    })

module.exports = app
