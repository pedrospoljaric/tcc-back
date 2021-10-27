const Router = require('./router')

const { multer } = require('./middlewares')
const { submitRecordsFile } = require('../controllers/records')

module.exports = new Router()
    .post('/', multer('file'), submitRecordsFile)
    .routes()
