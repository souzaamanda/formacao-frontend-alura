import { Cliente } from "./Cliente.js"; 

export class ContaCorrente {
    static numeroDeContas = 0; // atributo estático
    agencia;
    _cliente; // privado

    //para atribuir o valor correto de cliente, eveitar erros, so aceita se passar um cliente de fato (proteção)
    set cliente (novoValor){ 
        if(novoValor instanceof Cliente){
            this._cliente = novoValor;
        }
    }

    //acessor de acesso
    get cliente(){
        return this._cliente;
    }

    _saldo = 0;

    // saldo so possui o acessor de acesso e não o de atribuição(set)-somente leitura
    get _saldo (){
        return this._saldo;
    }

    constructor(cliente, agencia){
        this.agencia = agencia;
        this.cliente = cliente;
        ContaCorrente.numeroDeContas += 1;// somo na conta correte como um todo ennão na classe especifica

    }

    sacar(valor){ //molde para a operação saque
        if(this._saldo >= valor){
            this._saldo -= valor;
            return valor;
        }
    }

    depositar(valor){
        if(valor > 0){
            this._saldo += valor;
        }
    }

    transferir(valor, conta){
        const valorSacado = this.sacar(valor);
        conta.depositar(valorSacado);
    }
}