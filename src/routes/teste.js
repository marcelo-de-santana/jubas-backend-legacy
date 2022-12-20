//DEPENDENCIAS
const express = require("express");
const router = express.Router();
const dbConn = require('../services/mysql');

//ROTAS DA AGENDA
module.exports = router;

//TESTES
    router.get('/',(req,res)=>{
        let sql = `SHOW TABLES`
        dbConn.query(sql, (err,fields,results)=>{
            if(err) throw err;
            res.send(fields)
        })
    });


    //TESTE DE ROTA PARA PÁGINA DE FILA DE ATENDIMENTOS
    router.get('/schedule',(req,res)=>{
        let sql = `SELECT b.id, b.nome, e.horario_inicio, e.horario_fim, e.intervalo_inicio, e.intervalo_fim
        FROM barbeiro AS b INNER JOIN expediente AS e ON b.id = e.id_barbeiro;`
        dbConn.query(sql, (err,fields,results)=>{
            if(err) throw err;
            res.send(fields)
        })
    });