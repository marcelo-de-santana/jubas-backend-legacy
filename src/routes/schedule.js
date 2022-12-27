const express = require("express");
const router = express.Router();
const dbConn = require('../services/mysql');
const bodyParser = require("body-parser");
const {createPool} = require("mysql");

module.exports = router;

router.get('/', async (req,res) => {
    let sql = `SELECT b.id, b.nome, e.horario_inicio, e.horario_fim, e.intervalo_inicio, e.intervalo_fim
                FROM barbeiros AS b INNER JOIN expediente AS e ON b.id = e.id_barbeiro`;

    const result = await dbConn.execute(sql);
        //MONTAGEM DA AGENDA

    //VALORES DO EXPEDIÊNTE
    function morningShift(values){
        let workStart = timeSeparator(values.horario_inicio);
        let workEnd = timeSeparator(values.horario_fim);
        let time = [];
        for (let i = workStart[0]; i <=workEnd[0]; i++){
            workStart[0] = i;

            if(workStart[1] == 0) {
                time.push(`${workStart[0]}:${workStart[1]}`)
                workStart[1] = 30;
            } else {
                time.push(`${workStart[0]}:${workStart[1]}`)
                workStart[1] = '00'
            }
        }
        return time;
    }
    //FUNĆÃO RESPONSÁVEL POR SEPARAR OS VALORES DA LISTA
    function timeSeparator(array){
        let hour = [];
        array.split(':').map(value => {
            if (Number(value) == 0) {
                hour.push('00')
            } else {
                hour.push(Number(value))
            }
        });
        return hour;
    }

    const schedule = result.map((values,key) => {
       return {
           id: values.id,
           name: values.nome,
           horarios_disponíveis: morningShift(values)
       }
    });

    res.status(200).send(schedule);
});
