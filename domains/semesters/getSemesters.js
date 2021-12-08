const db = require('../../database')

module.exports = async () => {
    const semesters = await db.select('id', 'year', 'half').from('semesters').orderBy('year', 'DESC').orderBy('half', 'DESC')

    return {
        semesters
    }
}
