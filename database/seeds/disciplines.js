const disciplines = require('./fixtures/disciplines.json')

exports.seed = (knex) => knex('disciplines').insert(disciplines)
