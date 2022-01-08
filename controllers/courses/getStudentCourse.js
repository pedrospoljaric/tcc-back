const { prop } = require('lodash/fp')
const { getStudentCourse } = require('../../domains/courses')

module.exports = (ctx) => ({
    method: getStudentCourse,
    parameters: {
        userId: prop('user.id', ctx)
    }
})
