const app = require('./router')()
const health = require('./health')

app
    .use('/api/health', health)

module.exports = app
