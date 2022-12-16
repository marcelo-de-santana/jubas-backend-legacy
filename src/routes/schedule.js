//DEPENDENCIAS
    const express = require("express");
    const router = express.Router();
    const dbConn = require('../services/mysql');

//ROTAS DA AGENDA
    module.exports = router;

//AGENDA
    router.get('/',(req,res)=>{
        let sql = `SELECT * FROM agenda`;
        
        dbConn.query(sql, (err,result)=>{
            if(err) throw err;
            res.send(result);
        });
    });
