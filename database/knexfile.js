require('../dotenv').config()

module.exports = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
    },
    migrations: {
        directory: `${__dirname}/migrations`
    }
}
