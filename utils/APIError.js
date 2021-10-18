const errorCodes = {
    400: 'BadRequest',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'NotFound'
}

module.exports = (message, code = 500, data) => {
    const error = new Error(message)
    error.status = code
    error.name = errorCodes[code]
    error.data = data

    return error
}
