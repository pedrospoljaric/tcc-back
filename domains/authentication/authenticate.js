const jwt = require('jsonwebtoken')
const { APIError } = require('../../utils')
const { intranet } = require('../../services')

module.exports = async ({ username, password }) => {
    const loginSuccess = await intranet.authenticate({ username, password })
    if (!loginSuccess) throw APIError('Credenciais inválidas.', 401)

    return {
        token: jwt.sign({ username }, 'AS78D9087A4VC')
    }
}
