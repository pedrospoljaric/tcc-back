const { prop } = require('lodash/fp')
const { replyToFriendshipRequest } = require('../../domains/friendships')

module.exports = (ctx) => ({
    method: replyToFriendshipRequest,
    parameters: {
        userId: prop('user.id', ctx),
        requestId: Number(prop('params.requestId', ctx)),
        accept: prop('request.body.accept', ctx)
    }
})
