const { prop } = require('lodash/fp')
const { submitRecordsFile } = require('../../domains/records')

module.exports = (ctx) => ({
    method: submitRecordsFile,
    parameters: {
        file: prop('file', ctx)
    }
})
