module.exports = async (knex) => {
    const disciplines = await knex.select('id', 'name').from('disciplines')
    const disciplineIdByName = {}
    disciplines.forEach((discipline) => {
        const { id, name } = discipline
        disciplineIdByName[name.toUpperCase()] = id
    })

    const getDisciplineIdByName = (disciplineName) => disciplineIdByName[disciplineName.toUpperCase()]

    return knex('discipline_prerequisites').insert([
        { discipline_id: getDisciplineIdByName('Algoritmos e Estruturas de Dados I'), required_discipline_id: getDisciplineIdByName('Lógica de Programação') },
        { discipline_id: getDisciplineIdByName('Séries e Equações Diferenciais Ordinárias'), required_discipline_id: getDisciplineIdByName('Cálculo em Uma Variável') },

        { discipline_id: getDisciplineIdByName('Álgebra Linear'), required_discipline_id: getDisciplineIdByName('Geometria Analítica') },
        { discipline_id: getDisciplineIdByName('Algoritmos e Estruturas de Dados II'), required_discipline_id: getDisciplineIdByName('Algoritmos e Estruturas de Dados I') },
        { discipline_id: getDisciplineIdByName('Cálculo em Várias Variáveis'), required_discipline_id: getDisciplineIdByName('Cálculo em Uma Variável') },
        { discipline_id: getDisciplineIdByName('Cálculo em Várias Variáveis'), required_discipline_id: getDisciplineIdByName('Geometria Analítica') },
        { discipline_id: getDisciplineIdByName('Probabilidade e Estatística'), required_discipline_id: getDisciplineIdByName('Cálculo em Uma Variável') },

        { discipline_id: getDisciplineIdByName('Arquitetura e Organização de Computadores'), required_discipline_id: getDisciplineIdByName('Circuitos Digitais') },
        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Circuitos Digitais'), required_discipline_id: getDisciplineIdByName('Circuitos Digitais') },
        { discipline_id: getDisciplineIdByName('Programação Orientada a Objetos'), required_discipline_id: getDisciplineIdByName('Algoritmos e Estruturas de Dados I') },
        { discipline_id: getDisciplineIdByName('Projeto e Análise de Algoritmos'), required_discipline_id: getDisciplineIdByName('Matemática Discreta') },
        { discipline_id: getDisciplineIdByName('Projeto e Análise de Algoritmos'), required_discipline_id: getDisciplineIdByName('Algoritmos e Estruturas de Dados II') },

        { discipline_id: getDisciplineIdByName('Análise de Sinais'), required_discipline_id: getDisciplineIdByName('Séries e Equações Diferenciais Ordinárias') },
        { discipline_id: getDisciplineIdByName('Circuitos Elétricos II'), required_discipline_id: getDisciplineIdByName('Circuitos Elétricos I') },
        { discipline_id: getDisciplineIdByName('Circuitos Elétricos II'), required_discipline_id: getDisciplineIdByName('Fenômenos Eletromagnéticos') },
        { discipline_id: getDisciplineIdByName('Laboratório de Circuitos Elétricos'), required_discipline_id: getDisciplineIdByName('Circuitos Elétricos I') },
        { discipline_id: getDisciplineIdByName('Laboratório de Circuitos Elétricos'), required_discipline_id: getDisciplineIdByName('Fenômenos Eletromagnéticos') },
        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Arquitetura e Organização de Computadores'), required_discipline_id: getDisciplineIdByName('Arquitetura e Organização de Computadores') },
        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Arquitetura e Organização de Computadores'), required_discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Circuitos Digitais') },
        { discipline_id: getDisciplineIdByName('Linguagens Formais e Autômatos'), required_discipline_id: getDisciplineIdByName('Lógica de Programação') },
        { discipline_id: getDisciplineIdByName('Linguagens Formais e Autômatos'), required_discipline_id: getDisciplineIdByName('Matemática Discreta') },

        { discipline_id: getDisciplineIdByName('Banco de Dados'), required_discipline_id: getDisciplineIdByName('Algoritmos e Estruturas de Dados I') },
        { discipline_id: getDisciplineIdByName('Compiladores'), required_discipline_id: getDisciplineIdByName('Linguagens Formais e Autômatos') },
        { discipline_id: getDisciplineIdByName('Controle de Sistemas Dinâmicos'), required_discipline_id: getDisciplineIdByName('Análise de Sinais') },
        { discipline_id: getDisciplineIdByName('Controle de Sistemas Dinâmicos'), required_discipline_id: getDisciplineIdByName('Circuitos Elétricos II') },
        { discipline_id: getDisciplineIdByName('Engenharia de Software'), required_discipline_id: getDisciplineIdByName('Programação Orientada a Objetos') },
        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Engenharia de Sistemas'), required_discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Arquitetura e Organização de Computadores') },
        { discipline_id: getDisciplineIdByName('Mecânica Geral'), required_discipline_id: getDisciplineIdByName('Fenômenos Mecânicos') },
        { discipline_id: getDisciplineIdByName('Mecânica Geral'), required_discipline_id: getDisciplineIdByName('Geometria Analítica') },

        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Compiladores'), required_discipline_id: getDisciplineIdByName('Compiladores') },
        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Compiladores'), required_discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Engenharia de Sistemas') },
        { discipline_id: getDisciplineIdByName('Materiais Elétricos'), required_discipline_id: getDisciplineIdByName('Fenômenos Eletromagnéticos') },
        { discipline_id: getDisciplineIdByName('Sistemas Operacionais'), required_discipline_id: getDisciplineIdByName('Algoritmos e Estruturas de Dados I') },

        { discipline_id: getDisciplineIdByName('Cálculo Numérico'), required_discipline_id: getDisciplineIdByName('Cálculo em Uma Variável') },
        { discipline_id: getDisciplineIdByName('Cálculo Numérico'), required_discipline_id: getDisciplineIdByName('Geometria Analítica') },
        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Sistemas Operacionais'), required_discipline_id: getDisciplineIdByName('Sistemas Operacionais') },
        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Sistemas Operacionais'), required_discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Compiladores') },
        { discipline_id: getDisciplineIdByName('Programação Concorrente e Distribuída'), required_discipline_id: getDisciplineIdByName('Sistemas Operacionais') },
        { discipline_id: getDisciplineIdByName('Redes de Computadores'), required_discipline_id: getDisciplineIdByName('Programação Orientada a Objetos') },
        { discipline_id: getDisciplineIdByName('Segurança da Informação'), required_discipline_id: getDisciplineIdByName('Sistemas Operacionais') },

        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Comunicação Digital'), required_discipline_id: getDisciplineIdByName('Redes de Computadores') },
        { discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Comunicação Digital'), required_discipline_id: getDisciplineIdByName('Laboratório de Sistemas Computacionais: Sistemas Operacionais') },

        { discipline_id: getDisciplineIdByName('Trabalho de Graduação'), required_discipline_id: getDisciplineIdByName('Elaboração de Trabalhos Científicos e Tecnológicos em Computação') }
    ])
}
