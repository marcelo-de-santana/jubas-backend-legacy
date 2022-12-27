const express = require("express");
const router = express.Router();
const dbConn = require('../services/mysql');
const bodyParser = require("body-parser");
const { createPool } = require("mysql");

module.exports = router;

/** @GET **/

/** BUSCAR AGENDA DA BARBEARIA **/
router.get('/', async (req, res, next) => {
    let sql = `SELECT b.id, b.nome, e.horario_inicio, e.horario_fim, e.intervalo_inicio, e.intervalo_fim
                FROM barbeiros AS b INNER JOIN expediente AS e ON b.id = e.id_barbeiro`;

    let barbers = await dbConn.execute(sql);

    let hours = await dbConn.execute('SELECT * FROM calendario_diario');

    /**
     * Função responsável por retornar todos os horários em que o barbeiro estará disponível
     * @param {*} values 
     * @returns Array 
     */
    function getAvailableTimes(values) {

        //PREENCHE OS HORÁRIOS DISPONÍVEIS E RETORNA SEM OS HORARIOS DE ATENDIMENTO PREENCHIDOS
        let arrFilter = (hours.filter(item => {
            if (item.horarios >= values.horario_inicio && item.horarios <= values.horario_fim) {
                return item.horarios < values.intervalo_inicio || item.horarios >= values.intervalo_fim || item.horarios == values.horarios_marcados;
            }

        }));

        return arrFilter.map(item => { return item.horarios });
    
    }

    /**
     * Função responsável por retornar os horários que o barbeiro não está disponível
     * @param {*} values 
     * @returns Array
     * 
     */
    function getUnavailableTimes(values) {
        
        let arrFilter = (hours.filter(item => {    
            if (item.horarios >= values.intervalo_inicio && item.horarios < values.intervalo_fim || item.horarios == values.horarios_marcados) {
                return item.horarios
            }
        }));

        return arrFilter.map(item => { return item.horarios });
    
    }

    //CORPO DA AGENDA
    schedule = barbers.map(values => {
        return {
            id: values.id,
            name: values.nome,
            available_times: getAvailableTimes(values),
            unavailable_times: getUnavailableTimes(values),
            office_hour: [values.horario_inicio, values.horario_fim],
            office_break: [values.intervalo_inicio, values.intervalo_fim],
        }
    })

    res.status(200).send(schedule)

})
