const Router = require('./router')

const { getDisciplines } = require('#controllers/disciplines')

module.exports = new Router()
    .get('/', getDisciplines)
    .routes()
