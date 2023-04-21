const express = require('express');
const router = express.Router();
const dbConn = require('../services/mysql');
const bodyParser = require('body-parser');
const data = require('./data.json')

module.exports = router;

/** @GET **/

/** BUSCAR TODOS OS USUÁRIOS **/
router.get('/all', async (req, res) => {
    const sql = `SELECT id_usuario, cpf, nome, nivel_acesso, senha, status_cadastro FROM usuarios ORDER BY nivel_acesso`
    const results = await dbConn.execute(sql)

    res.status(200).send(results)
})

router.get('/', async (req, res, next) => {

    req
    const results = await dbConn.execute(`desc usuarios`)

    res.send(results)
})

/** BUSCAR CADASTRO **/



/** @POST **/

/** REALIZAR LOGIN **/
router.post('/sign-in', async (req, res, next) => {
    const sql = `SELECT id_usuario, nivel_acesso, status_cadastro FROM usuarios WHERE cpf = ? AND senha = ?`
    const params = [req.body.cpf, req.body.password]
    const results = await dbConn.execute(sql, params)

    let response
    if (results.length === 1) {
        return res.status(200).send({
            "message": "Usuário autenticado",
            "credentials": results
        })
    } else {
        return res.status(401).send({ "message": "Usuário ou Senha Incorretos" })
    }
})

/** CADASTRAR CLIENTE **/
router.post('/sign-up', async (req, res, next) => {

    let sql = `SELECT COUNT(*) AS valor FROM usuarios WHERE cpf = ?`
    let result = await dbConn.execute(sql, [req.body.cpf])

    //VERIFICA A EXISTÊNCIA DO CPF
    if (result[0].valor === 1) {
        return res.status(400).send({ "message": 'CPF já cadastrado' })
    } else {
        sql = `INSERT INTO usuarios SET ?`
        const params = {
            cpf: req.body.cpf,
            nome: req.body.name,
            email: req.body.email,
            data_de_nascimento: new Date(req.body.birthday),
            data_de_cadastro: new Date(Date.now()),
            telefone: req.body.phoneNumber,
            senha: req.body.password,
            nivel_acesso: 3,
            status_cadastro: 1
        }

        result = await dbConn.execute(sql, params)

        if (result) {
            return res.status(201).send({ "message": 'Cadastrado realizado com sucesso' })
        } else {
            return res.status(400).send({ "message": 'Ocorreu algum erro, entre em contato com o administrador' })
        }
    }

})

/** REDEFINIR SENHA **/
router.post('/recover-password', async (req, res, next) => {
    let sql = `SELECT email FROM usuarios WHERE cpf = ?`
    let result = await dbConn.execute(sql, [req.body.cpf])

    if (result.length === 1) {
        return res.send(200).send({ "message": "E-mail de redefinição de senha enviado" })
    } else {
        return res.status(401).send({ "message": "Usuário não cadastrado no sistema" })
    }

})

/** ATUALIZAR CADASTRO **/