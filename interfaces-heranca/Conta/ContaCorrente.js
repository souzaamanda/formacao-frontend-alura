import { Conta } from "./Conta.js";

export class ContaCorrente extends Conta{
    static numeroDeContas = 0;
    
    constructor(cliente, agencia){
        super(0,cliente,agencia); // faz uma referencia a classe que se esta estendendo (classe mãe)
        ContaCorrente.numeroDeContas += 1;
    }

    teste(){
        super.teste();
        console.log('teste na clase conta corrente')
    }

    //sobreescrevendo o comportamento de sacar
    sacar(valor){
        let taxa = 1.1;
        // const valorSacado = taxa * valor;
        // if(this._saldo >= valorSacado){
        //     this._saldo -= valorSacado;
        //     return valorSacado;
        // }
        
        return this._sacar(valor, taxa); // acessa as propriedades privadas da clasee conta
    
    }

   
}
