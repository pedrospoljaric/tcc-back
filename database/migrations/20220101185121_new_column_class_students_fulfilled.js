exports.up = (knex) => knex.schema.table('class_students', (table) => {
    table.boolean('fulfilled')
})

exports.down = (knex) => knex.schema.table('class_students', (table) => {
    table.dropColumn('fulfilled')
})
