const { prop } = require('lodash/fp')
const db = require('../../database')
const { APIError } = require('../../utils')

module.exports = async ({ userId, requestId, accept = true }) => {
    const user = await db
        .select('F.id', 'F.name AS username')
        .from('friend_requests AS FR')
        .innerJoin('users AS F', { 'FR.source_user_id': 'F.id' })
        .where({ 'FR.destination_user_id': userId, 'FR.is_accepted': null, 'FR.id': requestId })
        .first()
    if (!user) throw APIError('Solicitação não encontrada', 404)

    await db.transaction(async (trx) => {
        await trx.table('friend_requests').update({ replied_at: new Date(), is_accepted: accept }).where({ id: requestId })

        if (accept) {
            await trx.table('user_friends').insert([{
                user_id: userId, friend_id: prop('id', user)
            }, {
                user_id: prop('id', user), friend_id: userId
            }])
        }
    })
}
