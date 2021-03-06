const express =require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes');

const app = express();

//quando estiver em prod é dentro do cors que vai o endereço do site
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);














/* 
*Rota / Recurso
*/

/*Métodos HTTP: 
* 
* GET: Buscar uma informação do back-end
* POST: Criar uma informação do no back-end
* PUT: Alterar uma informação no back-end
* DELETE: Deletar uma informação no back-end
*/

/*
*Tipos de parâmetros:
*
*Query Params: Parâmetros enviados na rota após o "?" (Filtros, páginação) concatenar filtros "&"*
*Route Params: Parâmetros utilizados para identificar recursos
*Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/*
* SQL: MySQL, SQLite, PostgreeSQL, Oracle, Microsoft SQL Server
* NoSQL: MongoDB, CouchDB, etc.
*/

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */