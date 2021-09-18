require('dotenv').config()
const express = require('express')
const routes = require('./api')

const app = express()

const PORT = process.env.PORT || 1234

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(routes)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const errorCode = err.status || 500
    res.status(errorCode).send({
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
    console.log(`Server istening on port ${PORT}`)
})
