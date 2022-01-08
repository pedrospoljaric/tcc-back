const { prop } = require('lodash/fp')
const { loadStudentSelectedClasses } = require('../../domains/classes')

module.exports = (ctx) => ({
    method: loadStudentSelectedClasses,
    parameters: {
        userId: prop('user.id', ctx)
    }
})
