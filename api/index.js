const app = require('express')()
const health = require('./health')

app
    .use('/api/health', health)

module.exports = app
