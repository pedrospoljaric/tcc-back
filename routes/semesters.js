const Router = require('./router')

const { getClasses } = require('../controllers/classes')
const { getSemesters } = require('../controllers/semesters')

module.exports = new Router()
    .get('/', getSemesters)
    .get('/:semesterId/classes', getClasses)
    .routes()
