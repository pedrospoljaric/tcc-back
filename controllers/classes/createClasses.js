const { prop } = require('lodash/fp')
const { createClasses } = require('#domains/classes')

module.exports = (ctx) => ({
    method: createClasses,
    parameters: {
        year: Number(prop('request.body.year', ctx)),
        half: Number(prop('request.body.half', ctx)),
        classes: prop('request.body.classes', ctx)
    }
})
