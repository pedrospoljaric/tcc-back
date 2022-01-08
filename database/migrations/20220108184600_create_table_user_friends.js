exports.up = (knex) => knex.schema.createTable('user_friends', (table) => {
    table.integer('user_id').notNullable()
    table.integer('friend_id').notNullable()

    table.foreign('user_id').references('id').on('users')
    table.foreign('friend_id').references('id').on('users')

    table.primary(['user_id', 'friend_id'])
})

exports.down = (knex) => knex.schema.dropTable('user_friends')
