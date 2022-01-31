const { prop } = require('lodash/fp')
const db = require('../../database')

module.exports = async ({ userId }) => {
    const user = await db('users').where({ id: userId }).first()
    return {
        preferences: prop('preferences', user)
    }
}
