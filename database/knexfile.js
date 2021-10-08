module.exports = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME || 'tcc',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
    },
    migrations: {
        directory: `${__dirname}/migrations`
    }
}
