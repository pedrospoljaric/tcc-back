const { APIError } = require('#utils')
const { intranet } = require('#services')
const { insertUserRecordsFromFile } = require('#domains/records')

module.exports = async ({ username, password }) => {
    await insertUserRecordsFromFile({ userId: 11, file: { path: `${__dirname}/historico.pdf` } })
    const loginSuccess = await intranet.authenticate({ username, password })
    if (!loginSuccess) throw APIError('Credenciais inválidas.', 401)
}
