const { prop } = require('lodash/fp')
const { recommendSemesterClasses } = require('../../domains/recommendation')

module.exports = (ctx) => ({
    method: recommendSemesterClasses,
    parameters: {
        userId: prop('user.id', ctx),
        courseId: Number(prop('query.courseId', ctx))
    }
})
