const { prop } = require('lodash/fp')
const { createPreferencesRequest } = require('../../domains/preferences')

module.exports = (ctx) => ({
    method: createPreferencesRequest,
    parameters: {
        userId: prop('user.id', ctx),
        preferences: prop('request.body.preferences', ctx)
    }
})
