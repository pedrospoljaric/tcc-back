exports.up = (knex) => knex.schema.table('classes', (table) => {
    table.unique(['name', 'discipline_id', 'semester_id'])
})

exports.down = (knex) => knex.schema.table('classes', (table) => {
    table.dropunique(['name', 'discipline_id', 'semester_id'])
})
