const multer = require('multer')

module.exports = (file) => multer({ dest: 'tmp/' }).single(file)
