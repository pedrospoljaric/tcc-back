const express = require('express')
const controller = require('../controllers')

module.exports = () => {
    const app = express()

    return {
        ...app,
        get: (path, ...methods) => app.get(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1])),
        post: (path, ...methods) => app.post(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1])),
        put: (path, ...methods) => app.put(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1])),
        delete: (path, ...methods) => app.delete(path, ...methods.slice(0, methods.length - 1), controller(methods[methods.length - 1]))
    }
}
