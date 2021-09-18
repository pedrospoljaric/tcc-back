const app = require('./router')()

app
    .get('/', (req, res) => {
        res.end('ok')
    })

module.exports = app
