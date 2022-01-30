const Router = require('./router')

const { createPreferencesRequest } = require('../controllers/preferences')

module.exports = new Router()
    .put('/', createPreferencesRequest)
    .routes()
