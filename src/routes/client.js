//DEPENDENCIAS
    const express = require("express");
    const router = express.Router();
    const dbConn = require('../services/mysql');

//ROTAS DO CLIENTE
    module.exports = router;

/**Regra de negócio 1.1 */
//LOGIN
    router.get('/check-in', (req,res)=>{
        let sql = `SELECT COUNT(*) AS valor FROM cliente WHERE email = "${req.body.email}" AND senha = "${req.body.password}"`;
        
        dbConn.query(sql, (err,results) => {
            if(err) throw err;
            res.send(results[0])
        })
    });

/**Regra de negócio 1.2*/
//CADASTRO
    router.post('/sign-up', (req,res)=>{
        let sql = `INSERT INTO cliente SET ?`;
        let postVars ={
            cpf: req.body.cpf,
            nome: req.body.name,
            email: req.body.email,
            data_de_nascimento: new Date(req.body.birthday),
            telefone: req.body.phoneNumber,
            senha: req.body.password,
            data_de_cadastro: new Date(Date.now())
        }

        dbConn.query(sql, postVars, function(error, fields){
            if(error){console.log(error)}
        })
    });

/**Regra de negócio 1.3 */
//BUSCAR CLIENTE
    router.get('/', (req,res)=>{
        let sql = `SELECT * FROM cliente`
        
        dbConn.query(sql, (err,fields,results)=>{
            if(err) throw err;
            res.send(fields)
        })
    });
//ALTERAR CADASTRO
    router.get('/:id', (req,res)=>{
        let sql = `SELECT * FROM cliente WHERE id = ?`;
        let id = req.params.id
        
        dbConn.query(sql,id, (err,fields,results)=>{
            res.send(fields)
        })
    });

    router.post('/:id', (req,res)=>{
        let sql = `UPDATE cliente SET ? WHERE id = ?`
        let id = req.params.id
        let postVars = req.body
        
        dbConn.query(sql,postVars,id, (err,fields,results)=>{
            console.log(fields)
        })
    });

