const { prop } = require('lodash/fp')
const db = require('../../database')
const { APIError } = require('../../utils')

module.exports = async ({ userId, destinationUsername }) => {
    const destinationUser = await db('users').where({ name: destinationUsername }).first()
    if (!destinationUser) throw APIError('Usuário não encontrado', 404)
    const destinationUserId = prop('id', destinationUser)

    const pendingRequestExists = await db
        .select('*')
        .from('friend_requests')
        .where({ source_user_id: userId, destination_user_id: destinationUserId, is_accepted: null })
        .orWhere({ source_user_id: destinationUserId, destination_user_id: userId, is_accepted: null })
        .first()
    if (pendingRequestExists) throw APIError('Há uma solicitação pendente', 400)

    const isFriend = await db
        .select('*')
        .from('user_friends')
        .where({ user_id: userId, friend_id: destinationUserId })
        .orWhere({ user_id: destinationUserId, friend_id: userId })
        .first()
    if (isFriend) throw APIError('Usuário já é um amigo', 400)

    await db.table('friend_requests').insert({ source_user_id: userId, destination_user_id: destinationUserId })
}
