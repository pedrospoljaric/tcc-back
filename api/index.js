const app = require('./router')()
const health = require('./health')

app
    .get('/api/health', health)

module.exports = app
