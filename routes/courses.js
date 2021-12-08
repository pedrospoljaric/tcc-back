const Router = require('./router')

const { getCourses } = require('../controllers/courses')

module.exports = new Router()
    .get('/', getCourses)
    .routes()
