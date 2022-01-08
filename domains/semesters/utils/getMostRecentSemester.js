const db = require('../../../database')

module.exports = async () => {
    const semester = await db('semesters').orderBy('year', 'DESC').orderBy('half', 'DESC').first()

    return semester
}
