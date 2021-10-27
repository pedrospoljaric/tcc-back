const { prop } = require('lodash/fp')
const { authenticate } = require('../../domains/authentication')

module.exports = (ctx) => ({
    method: authenticate,
    parameters: {
        username: prop('request.body.username', ctx),
        password: prop('request.body.password', ctx)
    }
})
