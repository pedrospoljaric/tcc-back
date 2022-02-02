require('dotenv').config()
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const mount = require('koa-mount')
const respond = require('koa-respond')
const routes = require('./routes')

const app = new Koa()
require('koa-qs')(app)

const PORT = process.env.PORT || 1234

app
    .use(respond())
    .use(cors({
        origin: '*',
        methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
    .use(bodyParser(({ formLimit: '10mb', jsonLimit: '10mb', urlencoded: { extended: true } })))
    .use(mount('/api', routes))

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`)
})
