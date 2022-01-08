exports.up = (knex) => knex.schema.createTable('friend_requests', (table) => {
    table.increments()
    table.integer('source_user_id').notNullable()
    table.integer('destination_user_id').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('replied_at')
    table.boolean('is_accepted')

    table.foreign('source_user_id').references('id').on('users')
    table.foreign('destination_user_id').references('id').on('users')
})

exports.down = (knex) => knex.schema.dropTable('friend_requests')
