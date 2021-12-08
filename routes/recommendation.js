const Router = require('./router')

const { recommendSemesterClasses } = require('../controllers/recommendation')

module.exports = new Router()
    .get('/', recommendSemesterClasses)
    .routes()
