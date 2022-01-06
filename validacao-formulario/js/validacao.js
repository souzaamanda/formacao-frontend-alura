// const dataNascimento = document.querySelector('#nascimento')

// // adicionando um evento, quando perde o foco do campo 'blur'
// dataNascimento.addEventListener('blur',(evento)=>{
//     validaDataNascimento(evento.target)
// })

// função generica para todos os inputs, para evitar chamar EventListener para cada input diferente 
// verificação para saber qual o tipo de input, e qual função vai ser chamada dependendo do tipo de input 
export function valida (input){
    const tipoDeInput = input.dataset.tipo

    // condição que faz a comparação
    if(validadores[tipoDeInput]){
        // se tiver, pega o tipo de validador certo, executa a função relacionado ao tipo de input
        validadores[tipoDeInput](input)
    }

    // personalizando mensagem de error, caso no input o objeto validity tiver o valor valid como true, então ele vai arrancar a classe input-container—invalido
    // para mostrar as mensagens de error tem que alterar o innerHTML do spam
    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    }else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }

}

// objeto com todos os tipos de erro, vai ser um vetor de strings e cada valor de strings vai ser um tipo de erro
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

// objeto que vai receber todos os tipo de mensagem de error customizadas
const mensagemDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha :{
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos'
    },
    dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.'
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possível buscar o CEP.'
    },
    logradouro: {
        valueMissing: 'O campo logradouro não pode estar vazio.'
    },
    cidade: {
        valueMissing: 'O campo cidade não pode estar vazio.'
    },
    estado: {
        valueMissing: 'O campo estado não pode estar vazio.'
    },
    preco: {
        valueMissing: 'O campo preço não pode estar vazio.'
    }
}

// objeto que vai conter os diversos tipos de validação
const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input),
    cep: input => recuperarCEP(input)
}

// função que pega a mensagem de error
// precisa identificar que tipo de input, e qual o tipo de erro esse input tem usando a prorpiedade validity do input
function mostraMensagemDeErro(tipoDeInput, input){
    let mensagem = ''
    // laço de repetição que para cada tipo de erro que tenha que validar será checado com o validity do input, se true mostra a mensagem de erro
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagemDeErro[tipoDeInput][erro]
        }
    })
    return mensagem
}

function validaDataNascimento (input) {
    const dataRecebida = new Date(input.value)
    
    let mensagem = ''

    if(!maiorQue18 (dataRecebida)){
        mensagem = "Você deve ser maior que 18 anos para se cadastrar."
    } 

    // para o navegador entender que existe um erro no campo, tem que usar a propriedade setCustomValidity(), e valor dela é uma string
    // se for valido a mensagem é uma string vazia ' '
    input.setCustomValidity(mensagem)
}

// fazer a comparação das datas
function maiorQue18(data) {
    const dataAtual = new Date()
    // passar a data no formato que o Javascript espera, que é ano/mês/dia
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}

// validação do CPF
// é necessacio formatar o cpf antes utilizando o replace e um regex (pega tudo que não for digito e substitui por nada)
function validaCPF (input) {
    const cpfFormatado = input.value.replace(/\D/g, '')
    let mensagem = ''

    // utiliza-se a negação(!) para que caia na mensagem de erro
    if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)){
        mensagem = 'O CPF digitado não é válido.'
    }

    input.setCustomValidity(mensagem)
}

// checando se o numero do CPF é válido
function checaCPFRepetido (cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    let cpfValido = true

    // laço de repetição para verificar se o cpf vai bater com alguns dos valores que tem dento do vetor
    valoresRepetidos.forEach(valor => {
        if(valor == cpf) {
            cpfValido = false
        }
    })

    return cpfValido
}

// checando a estrutura do número do CPF, validando os 2 digitos verificadores
// vamos fazer cada um dos dígitos multiplicado por 10, por 9, por 8, por 7, por 6, até chegar em 2
// (10 * 1) + (9 * 2) + (8 * 3) ... (2 * 9)
// começar por 10, porque o primeiro dígito verificador está na décima posição do CPF
// dígito verificador é = 11 – (soma % 11),  o resto da divisão da soma por 11
// E caso o primeiro dígito verificador bata com a sequência, nós vamos descobrir o segundo, e é a mesma coisa, é a mesma soma e a mesma conta de subtração e resto de divisão. Mas agora, ao invés de começar com 10 o multiplicador, ele vai começar com 11. Porque aí o segundo dígito verificador está na 11ª posição do CPF. Vai ficar (11 * 1) + (10 * 2) + (9 * 3) ... (2 * 0)
// segundo dígito verificador depende da validação do primeiro

function checaEstruturaCPF (cpf) {
    const multiplicador = 10
    // o return vai ser um boolean de uma outra função
    return checaDigitoVerificador (cpf, multiplicador)
}

function checaDigitoVerificador (cpf, multiplicador) {
    // os dois digitos verificadores sendo válidos
    if (multiplicador >= 12) {
        return true
    }

    let multiplicadorInicial = multiplicador // para não subreescrever o multiplicador dentro do for
    let soma = 0

    // separando os numeros do cpf, usando substr para cortar e passa a posição inicial e final, usando o split separa os digitos isoladamente
    const cpfSemDigitos = cpf.substr(0, multiplicador -1).split('')

    // pegando os digitos verificadores
    const digitoVerificador = cpf.charAt(multiplicador - 1)

    // calculo da soma
    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
        contador++
    }

    //confirmando o digito, função recursiva
    // estamos verficiando: Se digitoVerificador for igual a ao retorno de confirmaDigito(soma) OU se digitoVerificador é igual a zero e o retor no de confirmaDigito(soma) é igual a 10.
    if((digitoVerificador == confirmaDigito(soma)) || (digitoVerificador == 0 && confirmaDigito(soma) == 10)) {
        // multiplicador passa a valer 11, assi ja faz a chacagem do segundo digito verificador
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false
} 

function confirmaDigito(soma) {
    return 11 - (soma % 11)
}

// validando CEP
function recuperarCEP (input) {
    // substituindo tudo que não for números por nada, garantindo assim que vai ser enviado para API apenas números
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`

    const options = {
        method: 'GET', //modo de requisição
        mode: 'cors', // importanteb para requisição entre API's
        headers: { // o que espera de resposta da API
            'content-type': 'application/json; charset = utf-8'
        } 
    }

    // validação antes de chamar a requisição, as duas condições tem que ser falsa, ai inverte o valor(!)
    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url,options).then (
            response => response.json()
        ).then(
            // recebendo o data que vai ser usado para preencher as informações dos outros campos
            data => {
                // tratando erro 
                if(data.erro) {
                    input.setCustomValidity ('Não foi possível buscar o CEP.')
                    return  
                }

                input.setCustomValidity ('')
                preencherCamposComCEP(data)
                return
            }
        )
    }

}

// preenchendo os campos
function preencherCamposComCEP(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')

    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf
}