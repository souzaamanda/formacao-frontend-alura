//classe abstrata - so funciona para ser herdada

export class Conta {
    constructor(saldoInicial, cliente, agencia){
        if(this.constructor == Conta){
            throw new Error('Você não deveria instanciar um obj do tipo conta!');
        }

        this._saldo = saldoInicial;
        this._cliente = cliente;
        this._agencia = agencia;

    }
    set cliente(novoValor){
        if(novoValor instanceof Cliente){
            this._cliente = novoValor;
        }
    }

    get cliente(){
        return this._cliente;
    }

    get saldo(){
        return this._saldo;
    }

   //metodo abstrato - feito para não ser chamadado diretamente e sim sobreescrito
    sacar(valor){
        // let taxa = 1;
        // return this._sacar(valor, taxa);//metodo sacar que é publico usando o privado passando os valores que precisa

        // Só que como o método sacar() retorna um valor que eu vou sacar depois, e eu gostaria de manter esse comportamento no meu sacar,
        // eu vou retornar o valor retornado por esse método, então eu vou dar um return aqui, return this._sacar.
        // Então o que o método sacar me retornar, eu vou retornar para quem chamou esse método aqui.
    
        throw new Error ('o metodo sacar da conta é abstrato')
    }

    _sacar(valor, taxa){
       const valorSacado = taxa * valor;
        if(this._saldo >= valorSacado){
            this._saldo -= valorSacado;
            return valorSacado;
        } 

        return 0;
    }

    depositar(valor){
        if(valor <= 0)
        {
            return;
        } 
        this._saldo += valor;           
    }

    tranferir(valor, conta){
        
        const valorSacado = this.sacar(valor);
        conta.depositar(valorSacado);
        
    }

    teste(){
        console.log('teste na clase conta')
    }
}