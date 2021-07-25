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
    .use(cors({ origin: '*' }))
    .use(bodyParser(({ formLimit: '10mb', jsonLimit: '10mb', urlencoded: { extended: true } })))
    .use(mount('/api', routes))

app.on('error', (err, ctx) => {
    const errorCode = err.status || 500
    ctx.send(errorCode, {
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
