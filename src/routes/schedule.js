const express = require("express");
const router = express.Router();
const dbConn = require('../services/mysql');
const bodyParser = require("body-parser");
const { createPool } = require("mysql");

module.exports = router;

/** @GET **/

/** BUSCAR AGENDA DA BARBEARIA **/
router.get('/', async (req, res, next) => {
    const sql = `SELECT b.id, b.nome, h.horario_inicio, h.horario_fim, h.intervalo_inicio, h.intervalo_fim
                FROM barbeiros AS b INNER JOIN horario_atendimento AS h ON b.id = h.id_barbeiro`

    const results = await dbConn.execute(sql)

    results.map(values => {
        const startTime = new Date(`1970-01-01T${values.horario_inicio}Z`)
        const endTime = new Date (`1970-01-01T${values.horario_fim}Z`)
        const startInterval = new Date (`1970-01-01T${values.intervalo_inicio}Z`)
        const endInterval = new Date(`1970-01-01T${values.intervalo_fim}Z`)
        const breaks = []
})})
    
/**

    //     return {
    //         id: values.id,
    //         name: values.nome,
    //         available_times: availableTimes,
    //         unavailable_times: unavailableTimes,
    //         office_hour: [values.horario_inicio, values.horario_fim],
    //         office_break: [values.intervalo_inicio, values.intervalo_fim],

    //     }
    // })

    // // function getAvailableTimes(values) {

    // //     //FILTRAGEM DE HORÁRIOS DISPONÍVEIS
    // //     const arrFilter = businessHours.filter(item => {
    // //         if (item.horarios >= values.horario_inicio && item.horarios < values.horario_fim) {
    // //             return item.horarios
    // //         }
    // //     })
    // //     return arrFilter.map(item => { return item.horarios })
    // // }

    // // function getUnavailableTimes(values) {

    // //     //FILTRAGEM DE HORÁRIOS INDISPONÍVIES
    // //     const arrFilter = (businessHours.filter(item => {
    // //         if (item.horarios >= values.intervalo_inicio && item.horarios < values.intervalo_fim || item.horarios == values.horarios_marcados) {
    // //             return item.horarios
    // //         }
    // //     }))
    // //     return arrFilter.map(item => { return item.horarios })
    // // }
    // res.status(200).send(results)
**/