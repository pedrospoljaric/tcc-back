const router = require('./router')
const { getRecordsByUserCredentials } = require('../controllers/records')

// const {
//     authenticate
// } = require('./middlewares')

// const authentication = require('./authentication')

// const db = require('../database')

router.post('/records', getRecordsByUserCredentials)

module.exports = router
