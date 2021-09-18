const app = require('express')()
// const { getRecordsByUserCredentials, checkResponse } = require('../controllers/records')
// const classGrids = require('./classGrids')

module.exports = app
    .get('/api/health', (req, res) => {
        res.end('ok')
    })
//     .use('/grids', classGrids)
//     .post('/records', getRecordsByUserCredentials)
//     .get('/responses/:requestId', checkResponse)
