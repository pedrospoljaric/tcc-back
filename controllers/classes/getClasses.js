const { prop } = require('lodash/fp')
const { getClasses } = require('../../domains/classes')

module.exports = (ctx) => ({
    method: getClasses,
    parameters: {
        semesterId: Number(prop('params.semesterId', ctx))
    }
})
