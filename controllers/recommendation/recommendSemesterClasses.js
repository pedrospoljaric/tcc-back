const { prop } = require('lodash/fp')
const { recommendSemesterClasses } = require('../../domains/recommendation')

module.exports = (ctx) => ({
    method: recommendSemesterClasses,
    parameters: {
        courseId: Number(prop('query.courseId', ctx)),
        semesterNumber: Number(prop('query.semesterNumber', ctx)),
        semesterId: Number(prop('query.semesterId', ctx))
    }
})
