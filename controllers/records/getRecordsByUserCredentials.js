const { prop } = require('lodash/fp')
const { getRecordsByUserCredentials } = require('../../domains/records')

module.exports = (req) => ({
    method: getRecordsByUserCredentials.makeRequest,
    parameters: {
        username: prop('request.body.username', req),
        password: prop('request.body.password', req)
    }
})
