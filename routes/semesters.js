const Router = require('./router')

const { getClasses } = require('../controllers/classes')

module.exports = new Router()
    .get('/:semesterId/classes', getClasses)
    .routes()
