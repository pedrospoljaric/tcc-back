const { prop } = require('lodash/fp')

module.exports = async (knex) => {
    const groupId = prop('id', await knex.select('id').from('discipline_groups').where({ name: 'Eletivas BCC II' }).first())

    const disciplines = await knex.select('id', 'name').from('disciplines')
    const disciplineIdByName = {}
    disciplines.forEach((discipline) => {
        const { id, name } = discipline
        disciplineIdByName[name.toUpperCase()] = id
    })

    const getDisciplineIdByName = (disciplineName) => disciplineIdByName[disciplineName.toUpperCase()]

    return knex('discipline_group_disciplines').insert([
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Álgebra Linear Computacional') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Álgebra Linear II') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Algoritmos em Bioinformática') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Análise de Sinais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Aprendizado de Máquina e Reconhecimento de Padrões') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Aspectos de implementação de banco de dados') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Bioinformática Avançada') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Computação Bioinspirada') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Desenvolvimento de Aplicações Robóticas') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução à Lógica Fuzzy') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Introdução às Redes Neurais Artificiais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Eletrônica Digital') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Arquitetura e Organização de Computadores') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Circuitos Digitais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Compiladores') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Engenharia de Sistemas') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de sistemas computacionais: Comunicação Digital') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Sistemas Operacionais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas de Comunicação') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Laboratório de usabilidade na web') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Métodos Numéricos para Equações Diferenciais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Processamento de Sinais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Programação Paralela e Processamento de Alto Desempenho') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Projeto de Sistemas Digitais') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Realidade Virtual e Aumentada') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Recuperação de Informação Multimídia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Séries Temporais e Previsões') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Simulação de Sistemas') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Sistemas Embarcados') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Sistemas Robóticos') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Teoria dos Números e Criptografia') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Fundamentos da Computação I') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Fundamentos da Computação II') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Fundamentos da Computação III') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Fundamentos da Computação IV') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Fundamentos da Computação V') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Tecnologia da Computação I') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Tecnologia da Computação II') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Tecnologia da Computação III') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Tecnologia da Computação IV') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos em Tecnologia da Computação V') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos Interdisciplinares em Computação I') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos Interdisciplinares em Computação II') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos Interdisciplinares em Computação III') },
        { discipline_group_id: groupId, discipline_id: getDisciplineIdByName('Tópicos Interdisciplinares em Computação IV') }
    ])
}
