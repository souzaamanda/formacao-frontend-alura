import { Cliente } from "./Cliente.js";
import { ContaCorrente } from "./ContaCorrente.js";

const cliente1 = new Cliente('Ricardo',11111111111); // cria um objeto a partir desse molde/ usando contrutor
// cliente1.nome = 'Ricardo';
//cliente1.cpf = 11111111111;


const cliente2 = new Cliente('Alice',22222222222);
// cliente2.nome = 'Alice';
//cliente2.cpf = 22222222222;

const contaCorrenteRicardo = new ContaCorrente(cliente1, 1001); // usando o contrutor
// contaCorrenteRicardo.agencia = 1001;
// contaCorrenteRicardo.cliente = cliente1;

contaCorrenteRicardo.depositar(100);

const contaCorrenteAlice = new ContaCorrente(cliente2, 1002);
// contaCorrenteAlice.agencia = 1002;
// contaCorrenteAlice.cliente = cliente2;

// outra forma de criar conta e cliente
const conta3 = new ContaCorrente();
conta3.cliente = new Cliente('Amanda',33333333333);
// conta3.cliente.nome = 'Amanda';
//conta3.cliente.cpf = 33333333333;
conta3.agencia = 1003;

//criando cliente usando o construtor
const clienteNovo = new Cliente('Julia',44444444444);
const conta4 = new ContaCorrente(clienteNovo,1004);

// console.log (clienteNovo);
// console.log (clienteNovo.cpf);


contaCorrenteRicardo.transferir(20, contaCorrenteAlice);



// const valorSacado = contaCorrenteRicardo.sacar(20);
// console.log(valorSacado);

// console.log(contaCorrenteRicardo);
// console.log(contaCorrenteAlice);
// console.log(conta3);
// console.log(clienteNovo);

//console.log(conta3);


// console.log(cliente1, cliente2);

console.log(ContaCorrente.numeroDeContas);




