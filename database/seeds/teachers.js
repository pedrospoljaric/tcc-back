const teachers = require('./fixtures/teachers.json')

exports.seed = (knex) => knex('teachers').insert(teachers)
