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

exports.getBarberHours = async (req, res, next) => {
    try {
        const sql = `
        SELECT h.id_barbeiro, u.nome, h.dia_semana, h.horario_inicio, h.horario_fim, h.intervalo_inicio, h.intervalo_fim 
        FROM horarios_barbeiro as h
        INNER JOIN usuarios as u
        ON h.id_barbeiro = u.id_usuario
        `
        const results = await dbConn.execute(sql)
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}

exports.setBarberHours = async (req, res, next) => {
    try {
        const sql = `INSERT INTO horarios_barbeiro VALUES ?`
        const params = {
            id_barbeiro: req.body.barber_id,
            dia_semana: 'Monday',
            horario_inicio: '00:00',
            horario_fim: '00:00',
            intervalo_inicio: '11:11',
            intervalo_fim: '11:11'
        }

        await dbConn.execute(sql, params)
        return res.status(201).send({ "message": "Registro inserido com sucesso" })
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }

}

exports.updateBarberHours = async (req,res,next) => {
    try{
        const sql = `UPDATE horarios_barbeiro SET ? WHERE id_barbeiro = "${req.body.barber_id}"`
        const params = {
            dia_semana: req.body.day,
            horario_inicio: req.body.start_time,
            horario_fim: '00:00',
            intervalo_inicio: '11:11',
            intervalo_fim: '11:11'
        }
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}