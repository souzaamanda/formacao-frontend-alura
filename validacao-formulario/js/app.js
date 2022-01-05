import { valida } from "./validacao.js";

// executar a função valida para todos os inputs, usando o seletor de tag
const inputs = document.querySelectorAll('input')


// E agora nós vamos chamar função de valida para cada input que nós temos dentro do nosso formulário
// E dependendo do tipo de input, ele vai executar a função adequada
// adicionado um evento de blur para todos os inputs
inputs.forEach(input =>{
    input.addEventListener('blur',(evento)=>{
        valida(evento.target)
    })
})
