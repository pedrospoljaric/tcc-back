const app = require('./router')()

module.exports = app
    .get('/', (req, res) => {
        res.end('ok')
    })
