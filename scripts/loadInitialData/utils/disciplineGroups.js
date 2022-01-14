module.exports = (knex) => knex('discipline_groups').insert([
    { name: 'Eletivas interdisciplinares' },
    { name: 'Eletivas livres' },
    { name: 'Eletivas BCC I' },
    { name: 'Eletivas BCC II' },
    { name: 'Eletivas BCC III' }
])
