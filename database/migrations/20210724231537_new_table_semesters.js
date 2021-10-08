exports.up = async (knex) => {
    await knex.schema.createTable('semesters', (table) => {
        table.increments()
        table.text('name').notNullable().unique()
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTable('semesters')
}
