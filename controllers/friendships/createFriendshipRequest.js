const { prop } = require('lodash/fp')
const { createFriendshipRequest } = require('../../domains/friendships')

module.exports = (ctx) => ({
    method: createFriendshipRequest,
    parameters: {
        userId: prop('user.id', ctx),
        destinationUsername: prop('request.body.destinationUsername', ctx)
    }
})
