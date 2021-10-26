const Router = require('./router')

const { authenticate } = require('#controllers/authentication')

module.exports = new Router()
    .post('/', authenticate)
    .routes()
