const { prop } = require('lodash/fp')
const getRecordsByUserCredentials = require('../../domains/records/getRecordsByUserCredentials')

module.exports = (req, res, next) => getRecordsByUserCredentials({
    username: prop('body.username', req),
    password: prop('body.password', req)
}).then((data) => res.json({ success: true, data })).catch(next)
