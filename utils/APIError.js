const errorCodes = {
    400: 'BadRequest',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'NotFound'
}

module.exports = (message, code) => {
    const error = new Error(message)
    error.expected = true
    error.status = code
    error.name = errorCodes[code]
    return error
}
