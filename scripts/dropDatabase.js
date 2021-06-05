const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database: 'postgres',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
});

(async () => {
    try {
        await knex.raw(`DROP DATABASE ${process.env.DATABASE}`)
        knex.destroy()
    } catch (err) {
        knex.destroy()
        throw err
    }
})().then()
