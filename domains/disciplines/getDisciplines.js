const db = require('../../database')

module.exports = async () => {
    const disciplines = await db.select('id', 'name').from('disciplines').orderBy('name')

    return {
        disciplines
    }
}
