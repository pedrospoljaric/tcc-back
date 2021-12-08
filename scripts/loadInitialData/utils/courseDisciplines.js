const { prop } = require('lodash/fp')

module.exports = async (knex) => {
    const computerEngineeringId = prop('id', await knex.select('id').from('courses').where({ name: 'Engenharia de Computação' }).first())

    const disciplines = await knex.select('id', 'name').from('disciplines')
    const disciplineIdByName = {}
    disciplines.forEach((discipline) => {
        const { id, name } = discipline
        disciplineIdByName[name.toUpperCase()] = id
    })

    const disciplineGroups = await knex.select('id', 'name').from('discipline_groups')
    const disciplineGroupIdByName = {}
    disciplineGroups.forEach((disciplineGroup) => {
        const { id, name } = disciplineGroup
        disciplineGroupIdByName[name.toUpperCase()] = id
    })

    const getDisciplineIdByName = (disciplineName) => disciplineIdByName[disciplineName.toUpperCase()]
    const getDisciplineGroupIdByName = (disciplineGroupName) => disciplineGroupIdByName[disciplineGroupName.toUpperCase()]

    return knex('course_disciplines').insert([
        { semester_number: 1, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Cálculo em Uma Variável') },
        { semester_number: 1, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Ciência, Tecnologia e Sociedade') },
        { semester_number: 1, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Fundamentos de Biologia Moderna') },
        { semester_number: 1, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Lógica de Programação') },
        { semester_number: 1, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Química Geral') },

        { semester_number: 2, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Algoritmos e Estruturas de Dados I') },
        { semester_number: 2, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Ciência, Tecnologia, Sociedade e Ambiente') },
        { semester_number: 2, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Desenho Técnico Básico') },
        { semester_number: 2, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Fenômenos Mecânicos') },
        { semester_number: 2, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Geometria Analítica') },
        { semester_number: 2, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Matemática Discreta') },
        { semester_number: 2, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Séries e Equações Diferenciais Ordinárias') },

        { semester_number: 3, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Álgebra Linear') },
        { semester_number: 3, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Algoritmos e Estruturas de Dados II') },
        { semester_number: 3, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Cálculo em Várias Variáveis') },
        { semester_number: 3, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Circuitos Digitais') },
        { semester_number: 3, course_id: computerEngineeringId, discipline_group_id: getDisciplineGroupIdByName('Eletivas interdisciplinares') },
        { semester_number: 3, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Fenômenos do Contínuo') },
        { semester_number: 3, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Probabilidade e Estatística') },

        { semester_number: 4, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Arquitetura e Organização de Computadores') },
        { semester_number: 4, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Circuitos Elétricos I') },
        { semester_number: 4, course_id: computerEngineeringId, discipline_group_id: getDisciplineGroupIdByName('Eletivas interdisciplinares') },
        { semester_number: 4, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Fenômenos Eletromagnéticos') },
        { semester_number: 4, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Circuitos Digitais') },
        { semester_number: 4, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Programação Orientada a Objetos') },
        { semester_number: 4, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Projeto e Análise de Algoritmos') },

        { semester_number: 5, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Análise de Sinais') },
        { semester_number: 5, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Circuitos Elétricos II') },
        { semester_number: 5, course_id: computerEngineeringId, discipline_group_id: getDisciplineGroupIdByName('Eletivas interdisciplinares') },
        { semester_number: 5, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Fenômenos eletromagnéticos experimental') },
        { semester_number: 5, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Laboratório de Circuitos Elétricos') },
        { semester_number: 5, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Arquitetura e Organização de Computadores') },
        { semester_number: 5, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Linguagens Formais e Autômatos') },

        { semester_number: 6, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Banco de Dados') },
        { semester_number: 6, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Compiladores') },
        { semester_number: 6, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Controle de Sistemas Dinâmicos') },
        { semester_number: 6, course_id: computerEngineeringId, discipline_group_id: getDisciplineGroupIdByName('Eletivas interdisciplinares') },
        { semester_number: 6, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Engenharia de Software') },
        { semester_number: 6, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Engenharia de Sistemas') },
        { semester_number: 6, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Mecânica Geral') },

        { semester_number: 7, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Compiladores') },
        { semester_number: 7, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Materiais Elétricos') },
        { semester_number: 7, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Microeconomia') },
        { semester_number: 7, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Projetos em Engenharia de Computação') },
        { semester_number: 7, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Seminários Interdisciplinares') },
        { semester_number: 7, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Sistemas Embarcados') },
        { semester_number: 7, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Sistemas Operacionais') },

        { semester_number: 8, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Cálculo Numérico') },
        { semester_number: 8, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Sistemas Operacionais') },
        { semester_number: 8, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Programação Concorrente e Distribuída') },
        { semester_number: 8, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Redes de Computadores') },
        { semester_number: 8, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Segurança da Informação') },
        { semester_number: 8, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Teorias Administrativas') },

        { semester_number: 9, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Elaboração de Trabalhos Científicos e Tecnológicos em Computação') },
        { semester_number: 9, course_id: computerEngineeringId, discipline_group_id: getDisciplineGroupIdByName('Eletivas livres') },
        { semester_number: 9, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('ECOS-EC') },
        { semester_number: 9, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Comunicação Digital') },

        { semester_number: 10, course_id: computerEngineeringId, discipline_group_id: getDisciplineGroupIdByName('Eletivas livres') },
        { semester_number: 10, course_id: computerEngineeringId, discipline_id: getDisciplineIdByName('Trabalho de Graduação') }
    ])
}
