//DEPENDENCIAS
const express = require("express");
const router = express.Router();
const dbConn = require('../services/mysql');

//ROTAS DO BARBERIO
module.exports = router;

/** BUSCAR TODOS OS BARBEIROS **/
router.get('/', async (req, res, next) => {

    const sql = ``

    const result = await dbConn.execute(sql)

    res.status(200).send(result)
})
