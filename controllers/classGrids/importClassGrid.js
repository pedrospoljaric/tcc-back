const { prop } = require('lodash/fp')
const { importClassGrid } = require('../../domains/classGrids')

module.exports = (ctx) => ({
    method: importClassGrid,
    parameters: {
        file: prop('file', ctx)
    }
})
