const { prop } = require('lodash/fp')
const { createClasses } = require('#domains/classes')

module.exports = (ctx) => ({
    method: createClasses,
    parameters: {
        semesterName: prop('request.body.semesterName', ctx),
        classes: prop('request.body.classes', ctx)
    }
})
