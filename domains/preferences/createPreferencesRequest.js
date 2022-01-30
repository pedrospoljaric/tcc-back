const db = require('../../database')

module.exports = async ({ userId, preferences }) => {
    await db.table('users').update({ preferences }).where({ id: userId })
}
