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
}

// objeto que vai conter os diversos tipos de validação
const validadores = {
    dataNascimento: input => validaDataNascimento(input)
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