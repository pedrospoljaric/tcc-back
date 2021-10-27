const { getTeachers } = require('../../domains/teachers')

module.exports = () => ({
    method: getTeachers
})
