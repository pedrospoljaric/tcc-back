const Router = require('./router')

const { getCourses, getStudentCourse } = require('../controllers/courses')

module.exports = new Router()
    .get('/', getCourses)
    .get('/registered', getStudentCourse)
    .routes()
