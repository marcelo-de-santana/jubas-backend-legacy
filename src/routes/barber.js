//DEPENDENCIAS
    const express = require("express");
    const router = express.Router();
    const dbConn = require('../services/mysql');

//ROTAS DO BARBERIO
    module.exports = router;

//BUSCA BARBEIROS
    router.get('/',(req,res)=>{
        let sql = `SELECT * FROM barbeiro`;
        
        dbConn.query(sql, (err,results)=>{
            if(err) throw err;
            res.json(results)
        })
    });

/**Regra de negócio 2.1 */
//BUSCA HORÁRIOS DE BARBEIROS
router.get('/service-hours', async(req,res) => {
    let sql = `SELECT e.id_barbeiro, e.horario, b.nome FROM expediente AS e INNER JOIN barbeiro AS b ON e.id_barbeiro = b.id;`;
    dbConn.execute(sql)
});
