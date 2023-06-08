const dbConn = require('../services/mysql');

//MÉTODO RESPONSÁVEL POR RETORNAR TODOS OS USUÁRIOS COM PERMISSÃO DE NÍVEL 2 (BARBEIRO)
exports.getBarbers = async (req, res, next) => {
    try {
        const sql = `
        SELECT 
            id_usuario AS barber_id,
            nome AS barber_name,
            status_cadastro AS status
        FROM
            usuarios
        WHERE
            nivel_acesso = 2
        `
        const result = await dbConn.execute(sql)

        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//METÓDO RESPONSÁVEL POR RETORNAR TODOS OS HORÁRIOS EM QUE OS BARBEIROS ESTÃO DISPONÍVEIS
exports.getBarberHour = async (req, res, next) => {
    try {
        const sql = `
        SELECT
            u.id_usuario as barber_id,
            h.id_horario AS time_id,
            u.nome AS barber_name,
            s.dia AS weekday,
            h.horario_inicio AS start_time,
            h.horario_fim AS end_time,
            h.intervalo_inicio AS start_interval,
            h.intervalo_fim AS end_interval,
            h.status
        FROM
            usuarios as u    
        LEFT JOIN
            horarios_barbeiro as h
        ON
            h.id_barbeiro = u.id_usuario
        LEFT JOIN
            semana as s
        ON
            h.dia_da_semana = s.id
        WHERE
            u.nivel_acesso = 2 AND u.status_cadastro = 1
        ORDER BY
            u.nome, h.dia_da_semana
            `
        const results = await dbConn.execute(sql)

        //ESTRUTURAÇÃO DA RESPOSTA DE FORMA QUE OS HORÁRIOS SEJAM RETORNADOS DE ACORDO COM O BARBEIRO
        let barberName
        let allResults = []
        results.forEach(value => {
            if (barberName == null || barberName != value.barber_name) {
                allResults.push({
                    barber_id: value.barber_id,
                    barber_name: value.barber_name,
                    times: [{
                        time_id: value.time_id,
                        weekday: value.weekday,
                        start_time: value.start_time,
                        end_time: value.end_time,
                        start_interval: value.start_interval,
                        end_interval: value.end_interval,
                        status: value.status
                    }],
                })
            } else {
                allResults[allResults.length - 1].times.push({
                    time_id: value.time_id,
                    weekday: value.weekday,
                    start_time: value.start_time,
                    end_time: value.end_time,
                    start_interval: value.start_interval,
                    end_interval: value.end_interval,
                    status: value.status
                })
            }
            barberName = value.barber_name
        })
        return res.status(200).send(allResults)
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//MÉTODO RESPONSÁVEL POR INSERIR UM HORÁRIO EM QUE O BARBEIRO ESTARÁ DISPONÍVEL
exports.setBarberHour = async (req, res, next) => {
    try {
        req.body.forEach(async (value) => {
            const sql = `INSERT INTO horarios_barbeiro SET ?`
            let params = {
                id_barbeiro: value.barber_id,
                dia_da_semana: value.weekday,
                horario_inicio: value.start_time,
                horario_fim: value.end_time,
                intervalo_inicio: value.start_interval,
                intervalo_fim: value.end_interval,
                status: value.status
            }
            await dbConn.execute(sql, params)
        })

        return res.status(201).send({
            message: "Registro gravado com sucesso"
        })
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }

}

exports.updateBarberHour = async (req, res, next) => {
    try {
        let sql = `UPDATE horarios_barbeiro SET ? WHERE id_horario = "${req.body.time_id}"`
        let params = {
            horario_inicio: req.body.times.start_time,
            horario_fim: req.body.times.end_time,
            intervalo_inicio: req.body.times.start_interval,
            intervalo_fim: req.body.times.end_interval,
            status: req.body.status
        }

        await dbConn.execute(sql, params)
        return res.status(200).send({
            message: "Registro gravado com sucesso"
        })
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//MÉTODO RESPONSÁVEL POR EXCLUIR UM HORÁRIO EM QUE O BARBEIRO ESTÁ DISPONÍVEL
exports.deleleBarberHour = async (req, res, next) => {
    try {
        const sql = `DELETE FROM horarios_barbeiro WHERE id_horario = "${req.body.time_id}"`

        await dbConn.execute(sql)
        return res.status(200).send({ "message": "Registro deletado com sucesso" })
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//MÉTODO RESPONSÁVEL POR RETORNAR TODOS OS SERVIÇOS DE COM O BARBEIRO
exports.getServices = async (req, res, next) => {
    try {
        const sql = `
        SELECT
            s.id_servico,
            s.nome_servico,
            d.id_disponibilidade,
            d.nome AS status
        FROM
            categorias AS c
        INNER JOIN 
            servicos AS s
        ON c.id_categoria = s.id_categoria
        INNER JOIN 
            disponibilidade AS d
        ON s.id_status_servico = d.id_disponibilidade
        `
        const results = await dbConn.execute(sql)

        //SEPARAR REGISTROS POR CATEGORIAS

        return res.status(200).send(results)
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.setService = async (req, res, next) => {
    try {
        const sql = `INSERT INTO servicos SET ?`
        const params = {
            id_categoria: req.body.category_id,
            id_status_servico: req.body.status_service_id,
            nome_servico: req.body.name_service,
            preco: req.body.price,
            duracao: req.body.duration
        }
        await dbConn.execute(sql, params)

        return res.send(201).send({
            message: "Registro gravado com sucesso"
        })

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.updateService = async (req, res, next) => {
    try {
        const sql = `UPDATE servicos SET ? WHERE id_servico = "${req.body.service_id}"`
        const params = {
            id_categoria: req.body.category_id,
            id_status_servico: req.body.status_service_id,
            nome_servico: req.body.name_service,
            preco: req.body.price,
            duracao: req.body.duration
        }
        await dbConn.execute(sql, params)

        return res.send(201).send({
            message: "Registro gravado com sucesso"
        })

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.deleteService = async (req, res, next) => {
    try {
        const sql = `DELETE FROM servicos WHERE id_servico = "${req.body.service_id}"`
        await dbConn.execute(sql)

        return res.status(200).send({ "message": "Registro deletado com sucesso" })
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.getCatogories = async (req, res, next) => {
    try {
        const sql = `SELECT id_categoria, nome_categoria FROM categorias`
        const results = await dbConn.execute(sql)

        return res.status(200).send(results)
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.setCategory = async (req, res, next) => {
    try {
        const sql = `INSERT INTO categorias SET ?`
        const params = {
            nome_categoria: req.body.category_name
        }
        await dbConn.execute(sql, params)

        return res.send(201).send({
            message: "Registro gravado com sucesso"
        })

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const sql = `UPDATE categorias SET ? WHERE id_categoria = "${req.body.category_id}"`
        const params = {
            nome_categoria: req.body.category_name
        }
        await dbConn.execute(sql, params)

        return res.send(201).send({
            message: "Registro gravado com sucesso"
        })

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const sql = `DELETE FROM categorias WHERE id_categoria = "${req.body.category_id}"`
        await dbConn.execute(sql)

        return res.status(200).send({ message: "Registro deletado com sucesso" })
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//MÉTODO RESPONSÁVEL POR BUSCAR AS ESPECIALIDADES DE ACORDO COM O ID DO BARBEIRO
exports.getBarberSpecialties = async (req, res, next) => {
    try {
        const sql = `
        SELECT
            c.id_categoria,
            c.nome_categoria,
            s.id_servico,
            s.nome_servico,
            s.preco,
            s.duracao
        FROM
            categorias AS c
        INNER JOIN
            servicos AS s
        ON
            s.id_categoria = c.id_categoria
        INNER JOIN
            especialidades_barbeiro AS eb
        ON
            eb.id_servico = s.id_servico
        INNER JOIN
            usuarios AS u
        ON
            u.id_usuario = eb.id_barbeiro
        WHERE
            u.id_usuario = ${req.params.id} AND s.id_status_servico = 1
        ORDER BY
            c.id_categoria, s.id_servico
        `

        const result = await dbConn.execute(sql)

        let lastCategoryId
        let allSpecialties = []

        result.forEach((value) => {
            if (lastCategoryId !== value.id_categoria) {
                allSpecialties.push({
                    category_id: value.id_categoria,
                    category_name: value.nome_categoria,
                    services: []
                });
            }

            const currentCategory = allSpecialties[allSpecialties.length - 1]
            currentCategory.services.push({
                specialty_id: value.id_especialidade,
                service_id: value.id_servico,
                service_name: value.nome_servico,
                price: value.preco,
                duration: value.duracao
            });

            lastCategoryId = value.id_categoria
        });

        return res.status(200).send(allSpecialties)
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error,
        })
    }
}

exports.deleteBarberSpecialty = async (req, res, next) => {
    try {
        const sql = `DELETE FROM especialidades_barbeiro WHERE id_barbeiro = ${req.body.barber_id} AND id_servico = ${req.body.service_id}`

        await dbConn.execute(sql)

        return res.status(200).send({
            message: "Registro deletado com sucesso"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error,
        })
    }
}