const { prop } = require('lodash/fp')
const { getRecordsByUserCredentials } = require('../../domains/records')

module.exports = (req) => ({
    method: getRecordsByUserCredentials.checkResponse,
    parameters: {
        requestId: prop('params.requestId', req)
    }
})
