require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./api')

const app = express()

const PORT = process.env.PORT || 1234

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/api', routes)

app.use((req, res, next, err) => {
    const errorCode = err.status || 500
    res.status(errorCode).json(errorCode, {
        success: false,
        error: {
            status: errorCode,
            name: err.name || 'APIError',
            message: err.message
        }
    })
})

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`)
})
