const Router = require('./router')
const { getRecordsByUserCredentials, checkResponse } = require('../controllers/records')
const classGrids = require('./classGrids')

module.exports = new Router()
    .use('/grids', classGrids)
    .post('/records', getRecordsByUserCredentials)
    .get('/responses/:requestId', checkResponse)
    .routes()
