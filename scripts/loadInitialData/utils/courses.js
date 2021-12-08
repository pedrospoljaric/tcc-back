module.exports = (knex) => knex('courses').insert([
    { name: 'Engenharia de Computação' }
])
