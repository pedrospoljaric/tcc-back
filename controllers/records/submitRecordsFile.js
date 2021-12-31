const { prop } = require('lodash/fp')
const { submitRecordsFile } = require('../../domains/records')

module.exports = (ctx) => ({
    method: submitRecordsFile,
    parameters: {
        userId: prop('user.id', ctx),
        file: prop('file', ctx)
    }
})
