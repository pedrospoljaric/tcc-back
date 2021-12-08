const { prop } = require('lodash/fp')

module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const status = prop('status', error) || 500

        ctx.send(status, {
            success: false,
            error: {
                status,
                name: prop('name', error) || 'APIError',
                message: prop('message', error)
            }
        })
    }
}
