const Router = require('./router')

const { createClasses, saveStudentSelectedClasses, loadStudentSelectedClasses } = require('../controllers/classes')

module.exports = new Router()
    .post('/', createClasses)
    .get('/selected', loadStudentSelectedClasses)
    .post('/selected', saveStudentSelectedClasses)
    .routes()
