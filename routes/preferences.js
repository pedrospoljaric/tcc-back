const Router = require('./router')

const { createPreferencesRequest, getUserPreferences } = require('../controllers/preferences')

module.exports = new Router()
    .get('/', getUserPreferences)
    .put('/', createPreferencesRequest)
    .routes()
