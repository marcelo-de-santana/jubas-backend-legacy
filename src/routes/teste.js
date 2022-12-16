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

    router.get('/desc',(req,res)=>{
        let sql = `DESC agenda`
        dbConn.query(sql, (err,fields,results)=>{
            if(err) throw err;
            res.send(fields)
        })
    });