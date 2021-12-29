import {Cliente} from "./Cliente.js"
import {ContaCorrente} from "./Conta/ContaCorrente.js"
import { ContaPoupanca } from "./Conta/ContaPoupanca.js";
import { ContaSalario } from "./Conta/ContaSalario.js";

const cliente1 = new Cliente("Ricardo", 11122233309);

const contaCorrenteRicardo = new ContaCorrente(1001, cliente1);
contaCorrenteRicardo.depositar(500);
contaCorrenteRicardo.sacar(100);

const contaPoupanca = new ContaPoupanca(50,cliente1,1001);

//contaCorrenteRicardo.teste();

contaPoupanca.sacar(10);

/*
console.log(contaPoupanca);
console.log(contaCorrenteRicardo);

const conta = new Conta(0, cliente1, 1001);
*/


const contaSalario = new ContaSalario(cliente1);
contaSalario.depositar(100);
contaSalario.sacar(20);

//console.log (contaSalario);




//-------FUNCIONARIOS-------//

import { Gerente } from "./Funcionarios/Gerente.js";
import { Diretor } from "./Funcionarios/Diretor.js";
import { SistemaAutenticacao } from "./SistemaAutenticacao.js";

const diretor = new Diretor('Laura', 10000, 12345678971);
const gerente = new Gerente('Antonio', 5000, 12345678993);
const cliente = new Cliente('Ruth', 58712423685, '987654');

diretor.cadastrarSenha('123456');
gerente.cadastrarSenha('654321')

const diretorEstaLogado = SistemaAutenticacao.login(diretor,'123456');
const gerenteEstaLogado = SistemaAutenticacao.login(gerente,'654321');
const clienteEstaLogado = SistemaAutenticacao.login(cliente, '987654');



console.log(diretorEstaLogado,gerenteEstaLogado);
console.log(clienteEstaLogado);







