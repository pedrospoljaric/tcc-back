const { multer } = require('./middlewares')
const Router = require('./router')

const {
    importClassGrid
} = require('../controllers/classGrids')

module.exports = new Router()
    .post('/import', multer('file'), importClassGrid)
    .routes()
