const jwt = require('jsonwebtoken')
const { prop } = require('lodash/fp')
const db = require('../../database')
const { APIError } = require('../../utils')
const { intranet } = require('../../services')

module.exports = async ({ username, password }) => {
    const loginSuccess = await intranet.authenticate({ username, password })
    // if (!loginSuccess) throw APIError('Credenciais inválidas.', 401)

    const user = await db.select('*').from('users').where({ name: username }).first()
    let userId = prop('id', user)

    if (!user) {
        const [newUser] = await db.table('users').insert({ name: username, registration_number: 1 }).returning('*')
        userId = prop('id', newUser)
    }

    return {
        token: jwt.sign({ id: userId }, process.env.JWT_PASSWORD)
    }
}
