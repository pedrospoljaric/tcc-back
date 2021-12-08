const { getCourses } = require('../../domains/courses')

module.exports = () => ({
    method: getCourses
})
