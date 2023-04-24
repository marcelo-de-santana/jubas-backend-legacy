const dbConn = require('../services/mysql');

exports.getSchedule = async (req, res, next) => {
    try {
        const sql = `
            SELECT h.id_barbeiro, u.nome, h.dia_semana, h.horario_inicio, h.horario_fim, h.intervalo_inicio, h.intervalo_fim, a.id_servico, a.id_status_atendimento, a.horario
            FROM horarios_barbeiro AS h
            INNER JOIN usuarios AS u
            ON h.id_barbeiro = u.id_usuario
            INNER JOIN agenda AS a
            INNER JOIN servicos AS s
            `

        const results = await dbConn.execute(sql)

        /*const sql = `SELECT b.id, b.nome, h.dia_semana, h.horario_inicio, h.horario_fim, h.intervalo_inicio, h.intervalo_fim
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
        */
        return res.status(200).send(results)
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}