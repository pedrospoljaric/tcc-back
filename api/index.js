const app = require('./router')()
const health = require('./health')

module.exports = app
    .get('/api/health', health)
