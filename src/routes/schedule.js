//DEPENDENCIAS
    const express = require("express");
    const router = express.Router();
    const dbConn = require('../services/mysql');

//ROTAS DA AGENDA
    module.exports = router;

//AGENDA
    router.get('/schedule',(req,res)=>{
        let sql = `SELECT * FROM expediente`;
        
        dbConn.query(sql, (err,result)=>{
            if(err) throw err;
            res.send(result);
        });
    });
