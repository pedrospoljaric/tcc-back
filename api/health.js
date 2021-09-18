const app = require('./router')()

app
    .getRaw('/', (req, res) => {
        res.end('ok')
    })

module.exports = app
