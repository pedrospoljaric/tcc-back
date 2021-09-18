const Router = require('./router')

module.exports = new Router()
    .get('/', (ctx) => {
        ctx.send('ok')
    })
    .routes()
