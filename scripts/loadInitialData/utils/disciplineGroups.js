module.exports = (knex) => knex('discipline_groups').insert([
    { name: 'Eletivas interdisciplinares' },
    { name: 'Eletivas livres' }
])
