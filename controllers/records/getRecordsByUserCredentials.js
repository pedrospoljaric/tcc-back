const { prop } = require('lodash/fp/prop')
const { getRecordsByUserCredentials } = require('../../domains/records')

module.exports = (req) => ({
    method: getRecordsByUserCredentials,
    parameters: {
        username: prop('body.username', req),
        password: prop('body.password', req)
    }
})
