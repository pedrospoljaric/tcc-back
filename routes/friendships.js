const Router = require('./router')

const {
    getPendingFriendshipRequests, getUserFriends, createFriendshipRequest, replyToFriendshipRequest
} = require('../controllers/friendships')

module.exports = new Router()
    .get('/friends', getUserFriends)
    .get('/requests', getPendingFriendshipRequests)
    .post('/requests', createFriendshipRequest)
    .put('/requests/:requestId', replyToFriendshipRequest)
    .routes()
