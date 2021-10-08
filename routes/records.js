const Router = require('./router')
const { getRecordsByUserCredentials, checkResponse } = require('#controllers/records')

module.exports = new Router()
    .post('/', getRecordsByUserCredentials)
    .get('/responses/:requestId', checkResponse)
    .routes()
