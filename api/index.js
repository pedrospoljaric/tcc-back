const app = require('./router')()
const health = require('./health')

app
    .get('/api/health', (req, res) => res.send('sim'))

module.exports = app
