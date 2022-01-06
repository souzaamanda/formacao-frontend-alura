import { valida } from "./validacao.js";

// executar a função valida para todos os inputs, usando o seletor de tag
const inputs = document.querySelectorAll('input')


// E agora nós vamos chamar função de valida para cada input que nós temos dentro do nosso formulário
// E dependendo do tipo de input, ele vai executar a função adequada
// adicionado um evento de blur para todos os inputs
inputs.forEach(input =>{

    // caso o tipo de input seja de máscara monetária será utilizada a máscara antes de enviar as informações para o validador
    if(input.dataset.tipo === 'preco') {
        SimpleMaskMoney.setMask(input, {
            prefix: 'R$ ', // o que vai vir antes do valor
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end' // começa a digitar o número do final e vai adicionando em sequência
        })
    }

    input.addEventListener('blur',(evento)=>{
        valida(evento.target)
    })
})
