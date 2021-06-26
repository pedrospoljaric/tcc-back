const Router = require('./router')
const { getRecordsByUserCredentials } = require('../controllers/records')

module.exports = new Router()
    .post('/records', getRecordsByUserCredentials)
    .routes()
