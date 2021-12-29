import {clienteService} from '../service/cliente-service.js'


// pegar os dados da API e colocar dentro do html
// criando um template
// id - para identificar cada elemento html
const criaNovaLinha = (nome,email,id) => {
    const linhaNovoCliente = document.createElement('tr')
    const conteudo = `
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>`
    linhaNovoCliente.innerHTML = conteudo
    // colocando um id em cada 'tr'  (linha da tabela) criada
    linhaNovoCliente.dataset.id = id
    return linhaNovoCliente
    
}

// percorrendo a árvore do DOM
const tabela = document.querySelector('[data-tabela]')

// verifica quando clicou no botao 'deletar'
// async/await - indica que é uma função assincrona, ganhando assim legibilidade
// await - substitui o .then
// try/catch - tentar executar um código, caso não de certo então executa o catch
tabela.addEventListener('click', async (evento)=>{
    evento.preventDefault()
    let ehBotaoDeletar = evento.target.className === 'botao-simples botao-simples--excluir'
    if(ehBotaoDeletar){
        try {
            // encontrando o elemento pai mais proximo da 'td' que tem o botão, que é a linha 'tr'
            const linhaCliente = evento.target.closest('[data-id]')
            let id = linhaCliente.dataset.id
            // deletando o cliente da API
            await clienteService.removeCliente(id)
            // .then(()=>{
                // removendo a linha toda 'tr'
                linhaCliente.remove()
            // })
        }
        catch(erro){
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
        
    }
    // apesar do preventDefault a pag continua recarregando apos clicar no botão excluir
})


// ele devolveu a promise então vou fazer algo .then()
// . (ponto) indica que esta se referinda a listaClientes
// render - aprensentando um resultad final, renderiza os dados na tela
// async/await - indica que é uma função assincrona, ganhando assim legibilidade
// await - substitui o .then
// try/catch - tentar executar um código, caso não de certo então executa o catch
const  render = async () => {
    try {
        const listaClientes = await clienteService.listaClientes()
        // .then(data =>{
            // data.forEach(elemento =>{
                listaClientes.forEach(elemento =>{
                tabela.appendChild(criaNovaLinha(elemento.nome,elemento.email, elemento.id))
            })
        // })
    }
    catch (erro){
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }
}

render()
