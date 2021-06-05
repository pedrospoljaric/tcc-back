// const { prop } = require('lodash/fp')
// const jwt = require('jsonwebtoken')
// const { APIError } = require('#utils')

// module.exports = async (req, res, next) => {
//     const token = (prop('headers.authorization', req) || '').split(' ')[1]

//     try {
//         req.info = {
//             user: jwt.verify(token, process.env.JWT_PASSWORD)
//         }
//         return next()
//     } catch (err) {
//         return next(APIError('Token inválido.', 401))
//     }
// }
