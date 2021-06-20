require('dotenv').config()
const express = require('express')
const path = require('path')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 1234

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/index.html'))
})

app.use('/api', routes)

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server istening on port ${PORT}`)
})
