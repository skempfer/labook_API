# Labook API   :rocket:

Esta API foi escrita para ser utilizada como rede social, tendo como funcionalidades básicas:
* signup - criação de novos usuários;
* login - autenticação do usuário;
* createFriendship - permite a criação de relacionamento "amizade" entre usuários;
* undoFriendship - permite desfazer o relação de "amizade" entre usuários;
* createPost - cria post com a possibilidade de incluir foto e descrição;
* getFeedAndPage - retorna o feed paginado com os pots dos usuários que tem relação de "amizade";
* getFeedByTypeAndPage - retorna o feed paginado com os posts dos usuários que tem relação de amizade e filtrados por type;
* likePost - Possibilidade de curtir posts;
* dislikePost - Possibilidade de descurtir posts;
* commentPost - Possibilidade de incluir comentários ao post dos usuários que tem relação de "amizade";

## Como começar:  :star:

Você pode utilizar a documentação oficial: 

* [Postman](https://explore.postman.com/templates/10027/doc-api---labook)

### Pré-requisitos: :triangular_flag_on_post:

A versão atual não necessita de pré-requisitos.

### Instalando: :heavy_check_mark:

Abra o terminal e digite o comando a seguir para clonar o repositório:
```
git clone https://github.com/skempfer/labook4_API.git
```
Abra a pasta do clone do repositório pelo terminal e digite:
```
npm install
```

## Construído com: :wrench:

* [Knex](http://knexjs.org/)
* [Typescript](https://www.typescriptlang.org/)  
* [Express](https://expressjs.com/pt-br/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [uuid](https://www.uuidgenerator.net/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
* [ts-node](https://www.npmjs.com/package/ts-node?activeTab=readme)
e suas versões @type

## Desenvolvedoras:  :computer:  :woman:

* **Milene Taborda** - [GitHub](https://github.com/milenetaborda) - [Linkedin](https://www.linkedin.com/in/milene-taborda/)
* **Shana Kempfer** - [GitHub](https://github.com/skempfer) - [Linkedin](https://www.linkedin.com/in/shana-kempfer-9231a1145/)
