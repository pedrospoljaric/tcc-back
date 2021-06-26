const KoaRouter = require('koa-router')
const controller = require('../controllers')

class Router extends KoaRouter {
    get(path, ...methods) {
        super.get(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1]))
        return this
    }

    post(path, ...methods) {
        super.post(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1]))
        return this
    }

    put(path, ...methods) {
        super.put(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1]))
        return this
    }

    delete(path, ...methods) {
        super.delete(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1]))
        return this
    }
}

module.exports = Router
