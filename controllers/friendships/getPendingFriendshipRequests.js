const { prop } = require('lodash/fp')
const { getPendingFriendshipRequests } = require('../../domains/friendships')

module.exports = (ctx) => ({
    method: getPendingFriendshipRequests,
    parameters: {
        userId: prop('user.id', ctx)
    }
})
