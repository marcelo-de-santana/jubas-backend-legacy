const express = require("express");
const router = express.Router();
const dbConn = require('../services/mysql');

module.exports = router;

/** @POST **/

/** REALIZAR LOGIN CLIENTE **/
router.post('/check-in', async (req,res,next) => {
    const sql = `SELECT * FROM clientes WHERE email = ? AND senha = ?`
    const params = [req.body.email,req.body.password]

    const result = await dbConn.execute(sql,params)

    if (result < 1) {
        return res.status(401).send({"message": "Usuário ou Senha Incorretos"})
    } else {
        return res.status(200).send({"message" : "Usuário Logado"})
    }
})

/** CADASTRAR CLIENTE **/
router.post('/sign-up', async (req,res,next) => {

    let result = await dbConn.execute(`SELECT * FROM clientes WHERE cpf = '${req.body.cpf}'`)

    if (result.length > 0) {
         res.status(400).send({"message" : 'CPF já cadastrado'})
    } else {
        const sql = `INSERT INTO clientes SET ?`
        const postVars = {
            cpf: req.body.cpf,
            nome: req.body.name,
            email: req.body.email,
            data_de_nascimento: new Date(req.body.birthday),
            telefone: req.body.phoneNumber,
            senha: req.body.password,
            data_de_cadastro: new Date(Date.now())
        }
        result = await dbConn.execute(sql, postVars)

        res.status(201).send({"message" : 'Cadastrado Realizado com Sucesso!'})
    }
})

/** @GET **/

/** BUSCAR TODOS OS CLIENTES **/
router.get('/', async (req,res,next) => {
    const result = await dbConn.execute(`SELECT * FROM clientes`)
    res.status(200).send(result)
})

/**
 * @PUT
 */
//ALTERAR CADASTRO CLIENTE


/**
 * @DELETE
 */
//DELETAR CADASTRO CLIENTE
