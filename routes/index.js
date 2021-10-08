const Router = require('./router')

const classGrids = require('./classGrids')
const records = require('./records')

module.exports = new Router()
    .use('/grids', classGrids)
    .use('/records', records)
    .routes()
