exports.up = (knex) => knex.schema.createTable('discipline_group_disciplines', (table) => {
    table.integer('discipline_group_id').notNullable()
    table.integer('discipline_id').notNullable()

    table.foreign('discipline_group_id').references('id').on('discipline_groups')
    table.foreign('discipline_id').references('id').on('disciplines')

    table.primary(['discipline_group_id', 'discipline_id'])
})

exports.down = (knex) => knex.schema.dropTable('discipline_group_disciplines')
