const multer = require('@koa/multer')

module.exports = (file) => multer({ dest: 'tmp/' }).single(file)
