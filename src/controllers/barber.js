const dbConn = require('../services/mysql');

exports.getBarbers = async (req, res, next) => {
    try {
        const sql = `SELECT id_usuario, nome FROM usuarios WHERE nivel_acesso = 2 AND status_cadastro = 1`

        const result = await dbConn.execute(sql)

        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}

exports.getBarberHour = async (req, res, next) => {
    try {
        const sql = `
        SELECT
            h.id_horario, h.id_barbeiro, u.nome,
            h.dia_semana, h.horario_inicio, h.horario_fim,
            h.intervalo_inicio, h.intervalo_fim, h.status 
        FROM
            horarios_barbeiro as h
        INNER JOIN
            usuarios as u
        ON
            h.id_barbeiro = u.id_usuario
        ORDER BY
            h.id_barbeiro
        `
        const results = await dbConn.execute(sql)

        return res.status(200).send(results)
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}

exports.setBarberHour = async (req, res, next) => {
    try {
        const sql = `INSERT INTO horarios_barbeiro SET ?`
        const params = {
            id_barbeiro: req.body.barber_id,
            dia_semana: req.body.weekday,
            horario_inicio: req.body.start_time,
            horario_fim: req.body.end_time,
            intervalo_inicio: req.body.start_interval,
            intervalo_fim: req.body.end_interval,
            status: req.body.status
        }

        await dbConn.execute(sql, params)
        return res.status(201).send({
            "message": "Registro gravado com sucesso"
        })
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }

}

exports.updateBarberHour = async (req, res, next) => {
    try {
        const sql = `UPDATE horarios_barbeiro SET ? WHERE id_barbeiro = "${req.body.barber_id}"`
        const params = {
            dia_semana: req.body.weekday,
            horario_inicio: req.body.start_time,
            horario_fim: req.body.end_time,
            intervalo_inicio: req.body.start_interval,
            intervalo_fim: req.body.end_interval,
            status: req.body.status
        }

        await dbConn.execute(sql, params)
        return res.status(200).send({
            "message": "Registro gravado com sucesso"
        })
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}

exports.deleleBarberHour = async (req, res, next) => {
    try {
        const sql = `DELETE FROM horarios_barbeiro WHERE id_horario = "${req.body.time_id}"`

        await dbConn.execute(sql)
        return res.status(200).send({ "message": "Registro deletado com sucesso" })
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}