//DEPENDENCIAS
    const express = require("express");
    const router = express.Router();
    const dbConn = require('../services/mysql');

//ROTAS DO BARBERIO
    module.exports = router;

/** BUSCAR TODOS OS BARBEIROS **/
router.get('/', async (req,res,next) => {
    const result = await dbConn.execute('SELECT * FROM barbeiro')

    res.status(200).send(result)
})

/**Regra de negócio 2.1 */
//BUSCA HORÁRIOS DE BARBEIROS
router.get('/service-hours', async(req,res) => {
    let sql = `SELECT e.id_barbeiro, e.horario, b.nome FROM expediente AS e INNER JOIN barbeiro AS b ON e.id_barbeiro = b.id`
    await dbConn.execute(sql)

    res.status(200).send({"message" : "Rota em construćão"})
})
