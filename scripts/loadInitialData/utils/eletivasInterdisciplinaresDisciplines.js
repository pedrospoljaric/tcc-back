const { prop } = require('lodash/fp')

module.exports = async (knex) => {
    const groupId = prop('id', await knex.select('id').from('discipline_groups').where({ name: 'Eletivas interdisciplinares' }).first())

    const disciplines = await knex.select('id', 'name').from('disciplines')
    const disciplineIdByName = {}
    disciplines.forEach((discipline) => {
        const { id, name } = discipline
        disciplineIdByName[name.toUpperCase()] = id
    })

    const getDisciplineIdByName = (disciplineName) => disciplineIdByName[disciplineName.toUpperCase()]

    return knex('discipline_group_disciplines').insert([
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Algoritmos em Bioinformática') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Alteridade e Diversidade no Brasil: Implicações para Política de Ciência e Tecnologia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Análise de Investimentos e Riscos') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Cultura dos Jogos Digitais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Economia Matemática') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Fundamentos de Mecânica Celeste') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Bioquímica') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Modelagem Computacional') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Mudança do Clima e Sociedade') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Probabilidade e Estatística') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tecnologia e Meio Ambiente') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tecnologia Social: Práxis e Contra-Hegemonia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Ciência e Tecnologia I') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos Interdisciplinares em Computação I') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Códigos Corretores de Erros') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Direitos Humanos, Multiculturalismo e C&T') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Economia, Sociedade e Ambiente') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Biotecnologia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Nanotecnologia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Biologia Molecular e Celular') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Microbiologia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Ciência e Tecnologia II') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos Interdisciplinares em Computação II') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Bioestatística') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Bioética e Biossegurança') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Biomateriais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Empreendedorismo em Biotecnologia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Ecologia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Aeroelasticidade') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Bioinformática') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Simulação de Sistemas') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Teoria dos Números e Criptografia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Ciência e Tecnologia III') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos Interdisciplinares em Computação III') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Fluxos em Redes') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Biologia de Sistemas') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Engenharia Bioquímica') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Métodos Probabilíticos em Pesquisa operacional') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Seleção de Materiais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Ciência e Tecnologia IV') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos Interdisciplinares em Computação IV') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Engenharia Tecidual e Medicina Regenerativa') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Séries Temporais e Previsões') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Computação Bioinspirada') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Métodos Numéricos para Equações Diferenciais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Otimização Inteira') }
    ])
}
