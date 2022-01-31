const { prop } = require('lodash/fp')
const { getUserPreferences } = require('../../domains/preferences')

module.exports = (ctx) => ({
    method: getUserPreferences,
    parameters: {
        userId: prop('user.id', ctx)
    }
})
