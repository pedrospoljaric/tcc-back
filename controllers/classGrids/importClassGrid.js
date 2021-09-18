const { prop } = require('lodash/fp')
const { importClassGrid } = require('../../domains/classGrids')

module.exports = (req) => ({
    method: importClassGrid,
    parameters: {
        file: prop('file', req)
    }
})
