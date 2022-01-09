const Router = require('./router')

const { multer } = require('./middlewares')
const { submitRecordsFile, checkUserRecordSubmission } = require('../controllers/records')

module.exports = new Router()
    .post('/', multer('file'), submitRecordsFile)
    .get('/submitted', checkUserRecordSubmission)
    .routes()
