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
    }
}

// objeto que vai conter os diversos tipos de validação
const validadores = {
    dataNascimento: input => validaDataNascimento(input)
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