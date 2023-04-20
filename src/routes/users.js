const express = require('express');
const router = express.Router();
const dbConn = require('../services/mysql');
const bodyParser = require('body-parser');
const data = require('./data.json')

module.exports = router;

/** @GET **/

/** REALIZAR LOGIN **/
router.post('/sing-in', async (req, res) => {

    const sql = `SELECT id_usuario, nivel_acesso, status_cadastro FROM usuarios WHERE cpf = ? AND senha = ?`
    const params = [req.body.cpf, req.body.password]

    const results = await dbConn.execute(sql,params)

    if (results.length === 1){
        return res.status(200).send(
            {
                "message": "Seja Bem Vindo!",
                "credentials": results
            }
        )
    } else {
        return res.status(401).send({ "message": "Usuário ou Senha Incorretos"})
    }

})

/** BUSCAR TODOS OS USUÁRIOS **/
router.get('/', async (req,res) => {
    const sql = `SELECT id_usuario, cpf, nome, nivel_acesso, senha, status_cadastro FROM usuarios ORDER BY nivel_acesso`

    const results = await dbConn.execute(sql)

    res.status(200).send(results)
})
