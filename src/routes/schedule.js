const express = require("express");
const router = express.Router();
const dbConn = require('../services/mysql');
const bodyParser = require("body-parser");

module.exports = router;

/** @GET **/

/** BUSCAR AGENDA DA BARBEARIA **/
router.get('/', async (req, res, next) => {
    const sql = `SELECT b.id, b.nome, h.dia_semana, h.horario_inicio, h.horario_fim, h.intervalo_inicio, h.intervalo_fim
                FROM barbeiros AS b INNER JOIN horario_atendimento AS h ON b.id = h.id_barbeiro`

    const results = await dbConn.execute(sql)

    const allResults = results.map(values => {
        //CONVETENDO HORÁRIOS EM MILISEGUNDOS
        const startTime = new Date(`1970-01-01T${values.horario_inicio}Z`).getTime()
        const endTime = new Date(`1970-01-01T${values.horario_fim}Z`).getTime()
        const startInterval = new Date(`1970-01-01T${values.intervalo_inicio}Z`).getTime()
        const endInterval = new Date(`1970-01-01T${values.intervalo_fim}Z`).getTime()
        //30 MINUTOS CONVETIDO EM MILISEGUNDOS
        const breakPoint = 1000 * 60 * 30

        //SEPARAÇÃO DE HORÁRIOS
        const availableTimes = []
        const unavailableTimes = []
        for (time = startTime; time <= endTime; time += breakPoint) {
            if (time >= startInterval && time < endInterval) {
                unavailableTimes.push(time)
            }
            availableTimes.push(time)
        }

        return {
            id: values.id,
            name: values.nome,
            day: values.dia_semana,
            available_times: availableTimes,
            unavailable_times: unavailableTimes,
            description: 'Horários em Timestamp'
        }
    })
    res.status(200).send(allResults)
})

/** BUSCAR SERVIÇOS QUE O BARBEIRO REALIZA **/
router.get('/specialties', async (req, res) => {
    const sql = `
        SELECT b.id, b.nome, b.status,
        s.id_servico, s.nome_servico, s.preco, s.duracao,
        c.id_categoria, c.nome_categoria
        FROM barbeiros AS b
        INNER JOIN especialidades AS e ON e.id_barbeiro = b.id
        INNER JOIN servicos AS s ON s.id_servico = e.id_servico
        INNER JOIN categorias AS c ON c.id_categoria = s.id_categoria 
    `
    const results = await dbConn.execute(sql)

    res.status(200).send(results)
})

/** BUSCAR TODOS OS SERVIÇOS POR CATEGORIA **/
router.get('/services-by-category', async (req, res) => {
    const sql = `
        SELECT * FROM categorias AS c
        INNER JOIN servicos AS s ON s.id_categoria = c.id_categoria
        ORDER BY c.id_categoria, s.id_servico
    `
    const results = await dbConn.execute(sql)

    let lastCategoryId
    let lastCategoryName
    let services = []
    let allResults = []

    //SEPARAÇÃO DOS SERVIÇOS EM CATEGORIAS
    results.forEach((value) => {
        if (lastCategoryId != value.id_categoria && lastCategoryId != null) {
            allResults.push({
                category_id: lastCategoryId,
                category_name: lastCategoryName,
                name_services: services,
            })
            services = []
        }

        //LISTAGEM DE SERVIÇOS
        services.push({
            service_id: value.id_servico,
            service_name: value.nome_servico,
            price: value.preco,
            duration: value.duracao,
        })

        lastCategoryId = value.id_categoria
        lastCategoryName = value.nome_categoria
    })

    //VERIFICAÇÃO DE NÃO INCLUSÃO NA LISTA
    if (services.length > 0) {
        allResults.push({
            category_id: lastCategoryId,
            category_name: results[results.length - 1].nome_categoria,
            name_services: services,
        })
    }

    res.status(200).send(allResults)
})