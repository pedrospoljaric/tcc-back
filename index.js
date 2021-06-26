require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 1234

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', routes)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.json({
        success: false,
        error: {
            message: err.message,
            stack: err.stack
        }
    })
})

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server istening on port ${PORT}`)
})
