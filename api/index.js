const app = require('./router')()
const health = require('./health')

app
    .getRaw('/api/health', (req, res) => { res.send('oi') })

module.exports = app
