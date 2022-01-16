const { prop } = require('lodash/fp')

module.exports = async (knex) => {
    const groupId = prop('id', await knex.select('id').from('discipline_groups').where({ name: 'Eletivas BCC III' }).first())

    const disciplines = await knex.select('id', 'name').from('disciplines')
    const disciplineIdByName = {}
    disciplines.forEach((discipline) => {
        const { id, name } = discipline
        disciplineIdByName[name.toUpperCase()] = id
    })

    const getDisciplineIdByName = (disciplineName) => disciplineIdByName[disciplineName.toUpperCase()]

    return knex('discipline_group_disciplines').insert([
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Alteridade e diversidade no Brasil: Implicações para Política de Ciência e Tecnologia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Análise de Investimentos e Riscos') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Cidadania, Ciência e Polêmica') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Cultura Digital') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Cultura dos Jogos Digitais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Direitos Humanos, Multiculturalismo e C&T') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Ecologia Avançada') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Econometria') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Economia Monetária e Bancos') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Empreendedorismo') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Gestão da Inovação') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Gestão de Projetos') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Ecologia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Economia Global') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Engenharia Financeira') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Legislação Ambiental e Políticas Públicas') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Macroeconomia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Marketing Estratégico') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Metodologia de Pesquisa e Comunicação Científica') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Microeconomia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Mudança do Clima e Sociedade') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Organização Industrial') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Política Científica e Tecnológica') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Qualidade') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Relações Étnico-Raciais e Cultura Afro-Brasileira e Indígena') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tecnologia e Meio Ambiente') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tecnologia Social: Práxis e Contra-Hegemonia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Teoria das Finanças') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Teorias Administrativas') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Trajetorias da Inovação') }
    ])
}
