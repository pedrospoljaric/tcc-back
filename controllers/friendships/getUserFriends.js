const { prop } = require('lodash/fp')
const { getUserFriends } = require('../../domains/friendships')

module.exports = (ctx) => ({
    method: getUserFriends,
    parameters: {
        userId: prop('user.id', ctx)
    }
})
