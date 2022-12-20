//DEPENDENCIAS
    const express = require("express");
    const router = express.Router();
    const dbConn = require('../services/mysql');

    module.exports = router;

/**
 * ROTAS DO CLIENTE
 * @GET
 */

/**Regra de negócio 1.2*/
//VERIFICAR EXISTÊNCIA DO CLIENTE
    router.get('/:cpf', (req,res)=>{
        let sql = `SELECT COUNT(*) as quantidade FROM cliente WHERE cpf = ?`;
        let cpf = req.params.cpf

        dbConn.query(sql,cpf, (err,fields)=>{
            res.send(fields);
        })
    });

    /**Regra de negócio 1.1 =>1.1.1 */
//LOGIN DO CLIENTE
    router.get('/check-in', (req,res)=>{
        let sql = `SELECT COUNT(*) AS exists FROM cliente WHERE email = "${req.body.email}" AND senha = "${req.body.password}"`;

        dbConn.query(sql, (err,results) => {
            if(err) throw err;
            res.send(results)
        })
    });

//BUSCAR CADASTRO CLIENTE
    router.get('/cadastro/:id', (req,res)=>{
        let sql = `SELECT * FROM cliente WHERE id = ?`;
        let id = req.params.id

        dbConn.query(sql,id, (err,fields)=>{
            res.send(fields)
        })
    });

//BUSCAR TODOS OS CLIENTES
    router.get('/', (req,res)=>{
        let sql = `SELECT * FROM cliente`

        dbConn.query(sql, (err,fields)=>{
            if(err) throw err;
            res.send(fields)
        })
    });


/**
 * @POST
 */

//CADASTRO DO CLIENTE
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

        dbConn.query(sql, postVars, (error, fields)=>{
            if(error){console.log(error)}
        })
    });


/**
 * @PUT
 */
//ALTERAR CADASTRO CLIENTE
    router.put('/cadastro/:id', (req,res,next)=>{
        let sql = `UPDATE cliente SET ? WHERE id = ?`
        let id = req.params.id
        let postVars = {
            email:              req.body.email,
            nome:               req.body.nome,
            telefone:           req.body.telefone,
            senha:              req.body.senha,
            data_de_nascimento: req.body.nascimento
        }

        dbConn.query(sql,postVars,id, (err,fields)=>{
            next();
        })
    });


/**
 * @DELETE
 */
//DELETAR CADASTRO CLIENTE
    router.delete('cadastro/:id', (req,res,next)=>{
        let sql = `DELETE FROM cliente WHERE id = ?`;
        let id = req.params.id;

        dbConn.query(sql,id, (err,fields)=>{
            next();
        })
    });