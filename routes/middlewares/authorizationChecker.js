const { prop } = require('lodash/fp')
const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
    const token = (prop('headers.authorization', ctx) || '').split(' ')[1]

    try {
        const tokenData = jwt.verify(token, process.env.JWT_PASSWORD)
        ctx.user = { id: prop('id', tokenData) }
    } catch (error) {
        throw new Error('User not authorized', 401)
    }
    await next()
}
