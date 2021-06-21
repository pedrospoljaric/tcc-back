const { prop } = require('lodash/fp')
const getRecordsByUserCredentials = require('../../domains/records/getRecordsByUserCredentials')

module.exports = (req, res, next) => getRecordsByUserCredentials({
    username: prop('query.username', req),
    password: prop('query.password', req)
}).then(res.json).catch(next)
