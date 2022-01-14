module.exports = (knex) => knex('courses').insert([
    { name: 'Engenharia de Computação' },
    { name: 'Ciência da Computação' }
])
