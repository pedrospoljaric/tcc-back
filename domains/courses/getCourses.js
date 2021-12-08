const db = require('../../database')

module.exports = async () => {
    const courses = await db.select('id', 'name').from('courses').orderBy('name')

    return {
        courses
    }
}
