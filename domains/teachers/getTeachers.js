const db = require('../../database')

module.exports = async () => {
    const teachers = await db.select('id', 'name').from('teachers').orderBy('name')

    return {
        teachers
    }
}
