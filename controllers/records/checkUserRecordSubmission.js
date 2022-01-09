const { prop } = require('lodash/fp')
const { checkUserRecordSubmission } = require('../../domains/records')

module.exports = (ctx) => ({
    method: checkUserRecordSubmission,
    parameters: {
        userId: prop('user.id', ctx)
    }
})
