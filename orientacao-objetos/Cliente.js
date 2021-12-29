export class Cliente { //classe é o molde , o que define o que eu quero ter
    nome;
    _cpf; // privado 
    
    get cpf() {
        return this._cpf;
    }

    //gerando um construtor da classe (controle de estado)
    constructor(nome, cpf){
        this.nome = nome;
        this._cpf = cpf;
    }
}