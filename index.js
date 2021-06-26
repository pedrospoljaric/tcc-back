require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 1234

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ preflightContinue: true }))
app.options(cors({ preflightContinue: true }))

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
