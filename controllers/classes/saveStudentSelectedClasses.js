const { prop } = require('lodash/fp')
const { saveStudentSelectedClasses } = require('../../domains/classes')

module.exports = (ctx) => ({
    method: saveStudentSelectedClasses,
    parameters: {
        userId: prop('user.id', ctx),
        classesIds: prop('request.body.classesIds', ctx)
    }
})
