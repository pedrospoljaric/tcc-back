const { prop } = require('lodash/fp')
const { getRecordsByUserCredentials } = require('../../domains/records')

module.exports = (ctx) => ({
    method: getRecordsByUserCredentials,
    parameters: {
        username: prop('request.body.username', ctx),
        password: prop('request.body.password', ctx)
    }
})
