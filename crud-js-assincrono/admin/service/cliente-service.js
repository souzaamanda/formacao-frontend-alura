// abrir conecção com API onde estão cadastrados dados


// englobandoo código
const listaClientes = () => {
    // // operações assincronas - Promise - A promise, traduzindo, é uma promessa. Vou fazer uma requisição e ele vai me devolver uma promessa de que quando aquela requisição for completa ou não, vou poder fazer alguma coisa com aquela resposta que ele vai me dar.
    // // promise - parametros (lidamcon sucesso ou erro da chamada)

    // const promise = new Promise((resolve, reject) => {

    //     // objeto XMLHttpRequest() fornece os metodos (responsável pela comunicação) inicializando o objeto
    
    //     const http = new XMLHttpRequest()

    //     // abrir a comunicação entre a aplicação e a API - argumentos ('o que vai pedir para o servidor','endereço para onde vai enviar')
    
    //     http.open('GET','http://localhost:3000/profile')

    //     // indicar para o JavaScript o que vai acontecer depois que fizermos essa requisição e enviar. O que vou fazer com a resposta que o servidor vai me enviar de volta.
    //     // metodo onload (ao carregar a página)
    
    //     http.onload = () => {
    //         // verificação da chamada
    //         // 400: requisição que não deu certo
    //         // response (o que o servidor devolveu)
    //         // JSON.parse() transformar a resposta em um elemeto javascript
    //         if(http.status >= 400){
    //             reject(JSON.parse(http.response))
    //         }else {
    //             resolve(JSON.parse(http.response))
    //         }    
    //     }
    //     // enviar a requeisição
    //     http.send()
    // })
    // return promise

    // Fetch substitui a promise e o http
    // fetch é um método global da interface da fetch API, a fetch API possui vários métodos que podemos utilizar, a fetch é um dos métodos utilizados da interface da fetch API, então aqui por padrão a fetch já faz um get, e já me devolve uma promise. Não precisa instanciar mais nada, simplesmente retorno a fetch
    return fetch(`http://localhost:3000/profile`)
    .then(resposta => {
        // verificando se esta tudo certo com a requisição
        if(resposta.ok){
            return resposta.json()
        }
        // caso contrário vai ser lançado um error
        throw new Error ('não foi possivel listar os clientes')
        
    })
}

// metodo POST - postar , enviar  as informações
// no cabeçalho (headers) qual tipo de informação eu to enviando
// no corpo (body) do formulário informações que irão ser enviadas
// JSON.stringify - converte para string (texto)
const criaCliente = (nome,email) => {
    return fetch(`http://localhost:3000/profile`,{
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then (resposta =>{
        // verificando se esta tudo certo com a requisição
        if(resposta.ok){
            return resposta.body
        }
        // caso contrário vai ser lançado um error
        throw new Error ('não foi possivel criar um cliente')
        
    })
}

// metodo DELETE - para deletar um cliente
// id - endereço de um clienti especifico (uma linha)
const removeCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    }).then (resposta => {
        // verificando se tem algo errado com a requisição
        if(!resposta.ok){
            // se sim, vai ser lançado um error
            throw new Error ('não foi possivel remover um cliente') 
        }
    })
}

// pega os dados do cliente que passar o id
const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`)
    .then(resposta => {
        // verificando se esta tudo certo com a requisição
        if(resposta.ok){
            return resposta.json()
        }
        // caso contrário vai ser lançado um error
        throw new Error ('não foi possivel detalhar o cliente')  
    })
}

// atualizando os dados do cliente
// PUT - colocar dados ou informações
const atualizaCliente = (id,nome,email) => {
    return fetch(`http://localhost:3000/profile/${id}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then(resposta => {
        // verificando se esta tudo certo com a requisição
        if(resposta.ok){
            return resposta.json()
        }
        // caso contrário vai ser lançado um error
        throw new Error ('não foi possivel atualizar o cliente')  
    })
}

// criando objeto
export const clienteService = {
    listaClientes,
    criaCliente,
    removeCliente,
    detalhaCliente,
    atualizaCliente
}






