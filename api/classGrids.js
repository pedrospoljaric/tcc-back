const { multer } = require('./middlewares')
const app = require('./router')()

const {
    importClassGrid
} = require('../controllers/classGrids')

module.exports = app
    .post('/import', multer('file'), importClassGrid)
