const dbConn = require('../services/mysql');

exports.getSchedule = async (req, res, next) => {
    try {
        const sql = `
            SELECT
                s.id, s.dia, h.id_barbeiro, u.nome, h.horario_inicio, h.horario_fim, h.intervalo_inicio, h.intervalo_fim
            FROM
                semana AS s
            INNER JOIN
                horarios_barbeiro AS h
            ON
                h.dia_da_semana = s.id
            INNER JOIN
                usuarios AS u
            ON
                h.id_barbeiro = u.id_usuario
            ORDER BY
                s.id, u.nome 
            `
        const results = await dbConn.execute(sql)

        let day
        const allResults = []

        results.map(values => {
            const {
                id,
                dia,
                id_barbeiro,
                nome,
                horario_inicio,
                horario_fim,
                intervalo_inicio,
                intervalo_fim
            } = values

            //CONVETENDO HORÁRIOS EM MILISEGUNDOS
            const horarios = {
                inicio: Date.parse(`1970-01-01T${horario_inicio}`),
                fim: Date.parse(`1970-01-01T${horario_fim}`) - (1000 * 60 * 30),
                intervaloInicio: Date.parse(`1970-01-01T${intervalo_inicio}`),
                intervaloFim: Date.parse(`1970-01-01T${intervalo_fim}`)
            }

            //INTERVALOS DE 30 MINUTOS EM MILISEGUNDOS
            const breakPoint = 1000 * 60 * 30

            const availableTimes = []
            const unavailableTimes = []

            //SEPARAÇÃO DE HORÁRIOS
            for (let time = horarios.inicio; time <= horarios.fim; time += breakPoint) {
                if (time >= horarios.intervaloInicio && time < horarios.intervaloFim) {
                    unavailableTimes.push(new Date(time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
                }
                availableTimes.push(new Date(time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
            }

            if (day == null || day != id) {
                allResults.push({
                    day_id: id,
                    day_name: dia,
                    daily_schedule: [{
                        barber_id: id_barbeiro,
                        barber_name: nome,
                        available_times: availableTimes,
                        unavailable_times: unavailableTimes,
                    }]
                })
            } else {
                allResults[allResults.length - 1].daily_schedule.push({
                    barber_id: id_barbeiro,
                    barber_name: nome,
                    available_times: availableTimes,
                    unavailable_times: unavailableTimes
                })
            }
            day = id
        })

        return res.status(200).send(allResults)
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.getScheduleServices = async (req, res) => {
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
}

exports.getAvailableTimes = async (req, res, next) => {
    try {
        const sql = `
    SELECT
        eb.id_barbeiro,
        eb.id_servico,
        s.nome_servico,
        s.duracao
    FROM
        servicos AS s
    LEFT JOIN
        especialidades_barbeiro AS eb
    ON
        s.id_servico = eb.id_servico
    WHERE s.id_servico IN (?) AND s.id_status_servico = 1
`
        const params = req.body.servicesId

        const results = await dbConn.execute(sql, params)

        res.status(200).send(results)
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.getScheduleTimes = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM agenda`
        const results = await dbConn.execute(sql)

        return res.status(200).send(results)
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.getWeekday = async (req, res, next) => {
    try {
        const sql = `SELECT id, dia AS day FROM semana`
        const results = await dbConn.execute(sql)
        return res.status(200).send(results)
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//MÉTODO RESPONSÁVEL POR BUSCAR AS ESPECIALIDADES QUE OS BARBEIROS ATENDEM 
exports.getSpecialties = async (req, res, next) => {
    try {
        const sql = `
        SELECT
            c.id_categoria,
            c.nome_categoria,
            s.id_servico,
            s.id_status_servico,
            s.nome_servico,
            s.preco,
            s.duracao,
            eb.id_especialidade,
            eb.id_barbeiro AS id_barbeiro,
            u.nome AS nome_barbeiro,
            u.status_cadastro
        FROM
            categorias AS c
        LEFT JOIN
            servicos AS s
        ON
            c.id_categoria = s.id_categoria
        LEFT JOIN
            especialidades_barbeiro AS eb
        ON
            s.id_servico = eb.id_servico
        LEFT JOIN
            usuarios AS u
        ON
            u.id_usuario = eb.id_barbeiro
        ORDER BY
            c.id_categoria, s.id_servico, eb.id_barbeiro
        `

        const result = await dbConn.execute(sql)

        let lastCategoryId
        let lastServiceId
        let allResults = []

        //ESTRUTURAÇÃO DA RESPOSTA
        result.forEach((value) => {
            //VERIFICA SE A CATEGORIA MUDA
            if (lastCategoryId !== value.id_categoria) {
                allResults.push({
                    category_id: value.id_categoria,
                    category_name: value.nome_categoria,
                    services: [
                        {
                            service_id: value.id_servico,
                            service_name: value.nome_servico,
                            price: value.preco,
                            duration: value.duracao,
                            providers: [],
                        },
                    ],
                })
                //VERIFICA SE O SERVIÇO MUDA
            } else if (lastServiceId !== value.id_servico) {
                allResults[allResults.length - 1].services.push({
                    service_id: value.id_servico,
                    service_name: value.nome_servico,
                    price: value.preco,
                    duration: value.duracao,
                    providers: [],
                })
            }

            //ADICIONA OS BARBEIROS QUE PRESTAM A ESPECIALIDADE
            if (value.id_barbeiro) {
                const currentCategory = allResults[allResults.length - 1]
                const currentService =
                    currentCategory.services[currentCategory.services.length - 1]
                currentService.providers.push({
                    barber_id: value.id_barbeiro,
                    barber_name: value.nome_barbeiro,
                })
            }

            lastCategoryId = value.id_categoria
            lastServiceId = value.id_servico
        })

        return res.status(200).send(allResults)
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}
exports.setCategory = async (req, res, next) => {
    try {
        const sql = `
        INSERT INTO
            categorias
        SET
            nome_categoria = "${req.body.category_name}"
        `
        await dbConn.execute(sql)

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

exports.updateCategory = async (req, res, next) => {
    try {
        const sql = `
    UPDATE 
        categorias
    SET
        nome_categoria = ?
    WHERE
        id_categoria = ? `
        await dbConn.execute(sql, [req.body.category_name, req.body.category_id])

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

exports.deleteCategory = async (req, res, next) => {
    try {
        const sql = `
    DELETE FROM
        categorias
    WHERE
        id_categoria = ? `
        await dbConn.execute(sql, [req.body.category_id])

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