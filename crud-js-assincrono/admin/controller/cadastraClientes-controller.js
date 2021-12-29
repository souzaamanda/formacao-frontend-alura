import { clienteService } from "../service/cliente-service.js"

// percorrendo o DOM
const formulario = document.querySelector('[data-form]')

// evento de escuta no formulário
formulario.addEventListener('submit', (evento) =>{
    // previnindo o comportamento padrão do formulário que é enviar as info sem checar o que tem dentro
    evento.preventDefault()

    // procurando exatamente onde esta acontecendo o evento
    const nome = evento.target.querySelector('[data-nome]').value
    const email = evento.target.querySelector('[data-email]').value

    // enviando os dados obtidos
    clienteService.criaCliente(nome, email)

    // redirecionando para uma outra pagina
    .then(()=>{
        window.location.href = '../telas/cadastro_concluido.html'
    })

})