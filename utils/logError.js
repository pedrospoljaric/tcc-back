const db = require('../database')

module.exports = async (error) => {
    await db.table('error_logs').insert({ message: JSON.stringify(error) })
}
