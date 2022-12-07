const env = require('dotenv').config().parsed
const mysql = require('mysql');

//REQUISIÇÃO DAS VARIÁVEIS DE AMBIENTE
const host = env['DB_HOST']
const name = env['DB_NAME']
const user = env['DB_USER']
const pass = env['DB_PASS']
const port = env['DB_PORT']

//REQUISIÇÃO DO BANCO DE DADOS
const connection = mysql.createConnection({
    host        : host,
    database    : name,
    user        : user,
    password    : pass,
    port        : port
});

//ABRINDO CONEXÃO COM O BANCO DE DADOS
connection.connect(
    function(error){
        if(error){
            console.log(error);
        };
});

module.exports = connection;