const express = require('express')
const controller = require('#controllers')

const router = express.Router()

module.exports = {
    get(path, ...methods) {
        return router.get(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1]))
    },
    post(path, ...methods) {
        return router.post(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1]))
    },
    put(path, ...methods) {
        return router.put(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1]))
    },
    delete(path, ...methods) {
        return router.delete(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1]))
    }
}
