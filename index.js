const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const dbConn = require('./src/services/mysql')

//VARIÁVEIS DE AMBIENTE
const sv = require('./src/config/environment.json').server

//CONFIGURAÇÃO DO FRAMEWORK
const app = express();
app.use(cors());

//REQUISIÇÕES POST
app.use(bodyParser.urlencoded({extended:false}));

//REQUISIÇÕES JSON
app.use(bodyParser.json());

//DIRECIONANDO PORTA DO SERVIDOR
app.listen(sv.port || 3000);

//ROTAS DO CLIENTE
app.post('/sign-up', (req,res)=>{
    let postVars = {
        cpf: req.body.cpf,
        nome: req.body.name,
        email: req.body.email,
        data_de_nascimento: new Date(req.body.birthday),
        telefone: req.body.phoneNumber,
        senha: req.body.password,
        data_de_cadastro: new Date(Date.now())
    }
    //INSERE CADASTRO NO BANCO DE DADOS
    dbConn.query("INSERT INTO cliente SET ?", postVars, function(error, fields){
        if(error){console.log(error)}
    });
    dbConn.end();
});

//LOGIN CLIENTE
app.get('/check-in', (req,res)=>{
    let sql = `SELECT COUNT(*) AS valor FROM cliente WHERE email = "${req.body.email}" AND senha = "${req.body.password}"`;
    dbConn.query(sql, (err,results) => {
        if(err) throw err;
        res.send(results[0])
    });
});

//BUSCA BARBEIROS
app.get('/barbers', (req,res)=>{
    let sql = `
        SELECT e.id_barbeiro, e.horario, b.nome
        FROM expediente AS e
        INNER JOIN barbeiro AS b
        ON e.id_barbeiro = b.id;`;
    dbConn.query(sql, (err,results)=>{
        if(err) throw err;
        res.json(results)
    })
})

//HORÁRIOS DE ATENDIMENTO
app.get('/schedule',(req,res)=>{
    let sql = `SELECT * FROM expediente`;
    dbConn.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//ROTAS PARA TESTE

//BUSCA BARBEIROS
app.get('/barbers',(req,res)=>{
    let sql = `
        SELECT e.id_barbeiro, e.horario, b.nome
        FROM expediente AS e
        INNER JOIN barbeiro AS b
        ON e.id_barbeiro = b.id;`;
    dbConn.query(sql, (err,results)=>{
        if(err) throw err;
        res.json(results)
    })
})
