const { prop } = require('lodash/fp')

module.exports = async (knex) => {
    const groupId = prop('id', await knex.select('id').from('discipline_groups').where({ name: 'Eletivas BCC I' }).first())

    const disciplines = await knex.select('id', 'name').from('disciplines')
    const disciplineIdByName = {}
    disciplines.forEach((discipline) => {
        const { id, name } = discipline
        disciplineIdByName[name.toUpperCase()] = id
    })

    const getDisciplineIdByName = (disciplineName) => disciplineIdByName[disciplineName.toUpperCase()]

    return knex('discipline_group_disciplines').insert([
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Fenômenos Eletromagnéticos') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Interação Humano-Computador') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução a Pesquisa Operacional') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Multimídia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Paradigmas de Programação') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Processamento de Imagens') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Segurança Computacional') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Sistemas Distribuídos') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Validação e Verificação de Software') }
    ])
}
