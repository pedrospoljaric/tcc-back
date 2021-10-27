const Router = require('./router')

const { createClasses } = require('../controllers/classes')

module.exports = new Router()
    .post('/', createClasses)
    .routes()
