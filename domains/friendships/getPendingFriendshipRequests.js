const db = require('../../database')

module.exports = async ({ userId }) => {
    const requests = await db
        .select(
            'FR.id',
            db.raw(`JSON_BUILD_OBJECT(
                'id', "F".id,
                'username', "F".name
            ) AS user`)
        )
        .from('friend_requests AS FR')
        .innerJoin('users AS F', { 'FR.source_user_id': 'F.id' })
        .where({ 'FR.destination_user_id': userId, 'FR.is_accepted': null })
        .orderBy('FR.created_at', 'DESC')

    return {
        requests
    }
}
