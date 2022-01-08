const db = require('../../database')

module.exports = async ({ userId }) => {
    const friends = await db
        .select('F.id', 'F.name AS username')
        .from('user_friends AS UF')
        .innerJoin('users AS F', { 'UF.friend_id': 'F.id' })
        .where({ 'UF.user_id': userId })
        .orderBy('F.name')

    return {
        friends
    }
}
