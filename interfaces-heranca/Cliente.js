export class Cliente{
    /*
    não precisa declara aqui pq ja esta sendo declarado dentro do construtor
    nome;
    _cpf;
    */

    get cpf(){
        return this._cpf;
    }

    constructor(nome, cpf, senha){
        this.nome = nome;
        this._cpf = cpf;
        this._senha = senha;
    }

    autenticar(){
        return true;
    }
}