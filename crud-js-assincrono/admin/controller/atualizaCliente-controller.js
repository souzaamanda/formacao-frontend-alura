import { clienteService } from "../service/cliente-service.js"

// tranformando a função inteira em autoexecutável ao carregar no html
(async()=>{
    // pegando o endereço da URL - instanci um objeto URL
    const pegaURL = new URL(window.location)
    const id = pegaURL.searchParams.get('id')

    // percorrendo o DOM para pegar os campos Nome e email
    const inputNome = document.querySelector('[data-nome]')
    const inputEmail = document.querySelector('[data-email]')

    // try/catch - tentar executar um código, caso não de certo então executa o catch
    try{
        // quando chamar a função detalhaCliente vai preencher os campos
        // await substitui o .then
        const dados = await clienteService.detalhaCliente(id)
        // .then (dados => {
            inputNome.value = dados.nome
            inputEmail.value = dados.email
        // })
    }
    catch (erro){
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }

    // procurar onde esta o formulário na pagina
    const formulario = document.querySelector('[data-form]')

    // evento de escuta para enviar informações
    // async/await - indica que é uma função assincrona, ganhando assim legibilidade
    // await - substitui o .then
    formulario.addEventListener('submit', async (evento) => {
        // previnindo o comportamento pardrão de enviar dados do formulario
        evento.preventDefault()

        // try/catch - tentar executar um código, caso não de certo então executa o catch
        try{
            await clienteService.atualizaCliente(id,inputNome.value,inputEmail.value)
            // .then(() =>{
                window.location.href = '../telas/edicao_concluida.html'
            // })
        }
        catch (erro){
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    })
})()
