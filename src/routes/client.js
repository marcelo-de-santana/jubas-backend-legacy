const express = require("express");
const router = express.Router();
const dbConn = require('../services/mysql');

module.exports = router;

/** @POST **/

/** REALIZAR LOGIN CLIENTE **/
router.post('/check-in', async (req, res) => {
    const sql = `SELECT * FROM clientes WHERE cpf = ? AND senha = ?`
    const params = [req.body.cpf, req.body.password]

    const result = await dbConn.execute(sql, params)

    if (result.length == 1) {
        return res.status(200).send({ "message": "Usuário Logado" })
    } else {
        return res.status(401).send({ "message": "Usuário ou Senha Incorretos" })
    }
})

/** CADASTRAR CLIENTE **/
router.post('/sign-up', async (req, res) => {

    let result = await dbConn.execute(`SELECT * FROM clientes WHERE cpf = '${req.body.cpf}'`)

    if (result.length == 1) {
        res.status(400).send({ "message": 'CPF já cadastrado' })
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
        
        if (result) {
            res.status(201).send({ "message": 'Cadastrado Realizado com Sucesso!' })
        } else {
            res.status(400).send({ "message": 'Ocorreu algum erro, entre em contato com o Administrador' })
        }
        
    }
})

/** @GET **/

/** BUSCAR TODOS OS CLIENTES **/
router.get('/', async (req, res) => {
    const result = await dbConn.execute(`SELECT * FROM clientes`)
    res.status(200).send(result)
})

/** BUSCAR CLIENTE POR ID **/
router.get('/:id/edit', async (req, res) => {
    const sql = `SELECT * FROM clientes WHERE id = ${req.params.id}`
    const result = await dbConn.execute(sql)
    if (result.length == 1) {
        res.status(200).send(result)
    } else {
        res.status(400).send({ 'message': 'Cliente não encontrado.' })
    }
})

/** @PUT **/
//ALTERAR CADASTRO CLIENTE
router.put('/:id/edit', async (req, res) => {
    const sql = `UPDATE clientes SET ? WHERE id = ${req.body.id}`
    const putVars = {
        email: req.body.email,
        nome: req.body.name,
        telefone: req.body.phoneNumber,
        senha: req.body.password,
        data_de_nascimento: new Date(req.body.birthday)
    }
    const result = await dbConn.execute(sql, putVars)
    if (result.length == 1) {
        res.status(200).send({ 'message': 'Dados alterados com sucesso.' })
    } else {
        res.send(400).send({ 'message': 'Não foi possível alterar os dados.' })
    }
})


/** @DELETE **/
//DELETAR CADASTRO CLIENTE
router.delete('/:id/destroy', async (req, res) => {
    const result = await dbConn.execute(`DELETE clientes WHERE id = ${req.body.id}`)
    if (result.length == 1) {
        res.status(200).send({ 'message': 'Cliente excluído com sucesso.' })
    } else {
        res.status(400).send({ 'message': 'Não foi possível excluir o cliente.' })
    }
})
