const db = require('../database')

const errorCodes = {
    400: 'BadRequest',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'NotFound'
}

module.exports = (message, code = 500) => {
    const error = new Error(message)
    error.status = code
    error.name = errorCodes[code]

    if (code >= 500) {
        db.table('error_logs').insert({ message: JSON.stringify(error) }).then()
    }

    return error
}
