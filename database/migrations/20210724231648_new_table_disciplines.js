const disciplinesNames = require('./fixtures/disciplinesNames.json')

exports.up = async (knex) => {
    await knex.schema.createTable('disciplines', (table) => {
        table.increments()
        table.text('name').notNullable().unique()
    })

    await knex.table('disciplines').insert(disciplinesNames.map((disciplineName) => ({ name: disciplineName }))).onConflict('name').ignore()
}

exports.down = async (knex) => {
    await knex.schema.dropTable('disciplines')
}
