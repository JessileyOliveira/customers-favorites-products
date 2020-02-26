# Produtos Favoritos dos Clientes

> API para controle de produtos favoritos dos clientes

## Instalação

_Tenha instalado em sua maquina o [Git](http://git-scm.com/) e [Node.js](http://nodejs.org/) 10.0.0 (ou superior). Caso prefira, instale o [Yarn](https://yarnpkg.com/)._

_Você também precisará do [mongoDB](https://www.mongodb.com/), mas poderá executá-lo através do [Docker](https://www.docker.com/) no `docker-compose.yml`._

1. Fork este repositório e crie um novo branch — ou crie um novo branch caso tenha permissão.

2. Depois de obter sua cópia local, instale suas dependências:

   ```sh
   npm install
   ```

   ou

   ```sh
   yarn
   ```

3. Inicie o [mongoDB](https://www.mongodb.com/) — ou execute o [Docker Compose](https://docs.docker.com/compose/):

   ```sh
   docker-compose up
   ```

   _Ele executará o mongoDB em sua máquina virtual docker na porta `27017`, mas você pode alterá-la em `docker-compose.yml`._

4. Crie um arquivo `.env` no diretório raiz, com as sequintes variaveis:

   ```sh
   SERVER_PORT=3000
   APP_SECRET=tokenSecret
   DB_URL=mongodb://localhost:27017/customers
   API_PRODUCTS=http://challenge-api.luizalabs.com
   ```

   _`APP_SECRET` pode ser o valor que desejar._

## Execução

Após a instalação, você podera executar a aplicação em modo de desenvolvimento:

```sh
npm run dev
```

ou

```sh
yarn dev
```

_Isso iniciará o servidor em `localhost:3000` (se você não alterou a propriedade`PORT` em `.env`)_

## Build

Execute:

```sh
npm run build
```

ou

```sh
yarn build
```

_Isso irá criar um diretório `dist` na raiz, com a aplicacão preparada para ser executada em producão. Execute o comando abaixo dentro do direrório `dist` para poder executar a aplicação:_

```sh
node server.js
```

## Testes

_Todos os arquivos de teste estão localizados na pasta `__tests__`_

Use o seguinte comando para executar os testes:

```sh
npm test
```

ou

```sh
yarn test
```

## API's

### Login

#### `POST`: `/sessions`

Faça o login e forneça o token de autenticação _(necessário para acessar as outras APIs)_:

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

_O token retornado deve ser enviado no header `Authorization` das próximas API's, da seguinte forma: `Bearer <token>`_

### Clientes

#### `GET`: `/customers/?page=<NUMERO_DA_PAGINA>`

_O parametro `page` é opcional. Caso ele não seja fornecido, será retornado os registros da página 1`_

Obtem todos os clientes

#### `GET`: `/customers/<ID_CLIENTE>`

Obtem um cliente pelo ID

#### `POST`: `/customers`

Cadastra um novo cliente

```json
{
  "name": "André Coelho",
  "email": "andrevrcoelho@hotmail.com"
}
```

#### `PUT`: `/customers/<ID_CLIENTE>`

Atualiza um cliente

```json
{
  "name": "André Coelho",
  "email": "andrevrcoelho@hotmail.com"
}
```

#### `DELETE`: `/customers/<ID_CLIENTE>`

Exclui um cliente

### Produtos favoritos

#### `POST`: `/customers/<ID_CLIENTE>/favorites-products`

Adiciona um produto favorito para um cliente

```json
{
  "productId": "<ID_PRODUTO>"
}
```

_ID de um produto disponivel na API de produtos do Magalu [neste link](http://challenge-api.luizalabs.com/api/product/?page=1)_

#### `GET`: `/customers/<ID_CLIENTE>/favorites-products`

Obtem a lista de produtos favoritos de um cliente

#### `DELETE`: `/customers/<ID_CLIENTE>/favorites-products/<ID_PRODUTO>`

Exclui um produto da lista de favoritos de um cliente

## Licença

[MIT](https://opensource.org/licenses/MIT)
