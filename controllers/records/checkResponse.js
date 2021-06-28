const { prop } = require('lodash/fp')
const { getRecordsByUserCredentials } = require('../../domains/records')

module.exports = (ctx) => ({
    method: getRecordsByUserCredentials.checkResponse,
    parameters: {
        requestId: prop('query.requestId', ctx)
    }
})
