exports.up = (knex) => knex.schema.table('course_disciplines', (table) => {
    table.integer('depth')
})

exports.down = (knex) => knex.schema.table('course_disciplines', (table) => {
    table.dropColumn('depth')
})
