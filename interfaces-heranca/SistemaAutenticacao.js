/*
Ser autenticavel significa ter a método autenticar()
'senha' é um atributo muito particular, nao pode expor
método autenticar() que recebe uma senha e 
ele vai retornar se aquela senha é igual a que ele tem internamente ou não
assim melhora o encapsulamento e deixa o vocabulário melhor

duck type
*/

export class SistemaAutenticacao {
    static login (autenticavel, senha){
        if(SistemaAutenticacao.ehAutenticavel(autenticavel)){ // nova camada de proteção
           return autenticavel.autenticar(senha); 
        }
        return false;
    }

    static ehAutenticavel(autenticavel){
        return 'autenticar' in autenticavel && //segunda verificação
        autenticavel.autenticar instanceof Function
    }
}

/*
E dessa forma conseguimos ver que o nosso sistema de autenticação se preocupa muito mais com a interface que os objetos expõem, 
com o que podemos manusear e manipular deles, métodos e propriedades, do que com qual o tipo deles de fato.
Não interessa para esse sistema de autenticação se eu sou um cliente, se eu sou um diretor, se eu sou um gerente,
se eu sou um funcionário, se eu sou uma conta. Se eu tiver o método autenticar(), 
quer dizer que eu sou autenticável, então eu posso executar aqui.

--nova camada de proteção
fazer um if, eu vou falar que se no meu SistemaAutenticacao tiver um método ehAutenticavel, 
e esse método vai receber o nosso objeto autenticavel, que estamos supondo que é, e ele vai me retornar 
verdadeiro ou falso. E se ele for autenticável eu vou entrar no if, então eu vou tentar chamar o método
autenticar, porque eu sei que esse método existe, eu já fiz uma camada de verificação aqui. 
Se ele não entrar nesse if quer dizer que ele não é, se ele não é autenticável, 
ele não vai logar no meu sistema, então eu vou, por padrão, retornar false.

--segunda verificação
quando meu sistema de autenticação procura a chave autenticar, ele está procurando uma função, 
porque ele está executando essa função, e para executar essa função elas têm que ser do tipo de uma função.
no SistemaAutenticacao eu tenho que fazer uma segunda verificação, eu tenho que verificar se o autenticar existe
dentro do meu autenticavel, e vou pôr o meu operador &&, e se o meu autenticavel.autenticar é do tipo de uma função, 
se ele é uma instância de uma função, ele é um instanceof de função.
Então um método, quando está dentro de um objeto, também é um objeto, é um objeto dentro do outro,
por isso que nós colocamos uma função que é um construtor de função, é uma maneira de chamarmos os nossos métodos.
*/