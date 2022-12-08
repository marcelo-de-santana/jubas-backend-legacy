const db = require('../../../jubas-app/src/config/environment.json').database
const mysql = require('mysql');

//CONECTANDO O BANCO DE DADOS
const dbConn = mysql.createConnection({
    host        : db.host,
    database    : db.name,
    password    : db.pass,
    user        : db.user,
    port        : db.port
});

module.exports = dbConn;