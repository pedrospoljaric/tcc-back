const Router = require('./router')

const { multer } = require('./middlewares')
const { importClassGrid } = require('#controllers/classGrids')

module.exports = new Router()
    .post('/import', multer('file'), importClassGrid)
    .routes()
