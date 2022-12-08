const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

//VARIÁVEIS DE AMBIENTE
const sv = require('../config/environment.json').server

//CONFIGURAÇÃO DO FRAMEWORK
const app = express();
app.use(cors());

//REQUISIÇÕES POST
app.use(bodyParser.urlencoded({extended:false}));

//REQUISIÇÕES JSON
app.use(bodyParser.json());

//DIRECIONANDO PORTA DO SERVIDOR
app.listen(sv.port || 3000);

module.exports = app