const Router = require('./router')

const { getTeachers } = require('../controllers/teachers')

module.exports = new Router()
    .get('/', getTeachers)
    .routes()
