const dbConn = require('../services/mysql');

exports.signIn = async (req, res, next) => {
    try {
        const sql = `SELECT id_usuario, nivel_acesso, status_cadastro FROM usuarios WHERE cpf = ? AND senha = ?`
        const params = [req.body.cpf, req.body.password]
        const results = await dbConn.execute(sql, params)

        if (results.length === 1) {
            return res.status(200).send({
                "message": "Usuário autenticado",
                "credentials": results
            })
        } else {
            return res.status(401).send({ "message": "Usuário ou Senha Incorretos" })
        }
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}

exports.signUp = async (req, res, next) => {
    try {
        let sql = `SELECT COUNT(*) AS valor FROM usuarios WHERE cpf = ?`
        let result = await dbConn.execute(sql, [req.body.cpf])

        //VERIFICA A EXISTÊNCIA DO CPF
        if (result[0].valor === 1) {
            return res.status(400).send({ "message": 'CPF já cadastrado' })
        } else {
            sql = `INSERT INTO usuarios SET ?`
            const params = {
                cpf: req.body.cpf,
                nome: req.body.name,
                email: req.body.email,
                data_de_nascimento: new Date(req.body.birthday),
                data_de_cadastro: new Date(Date.now()),
                telefone: req.body.phoneNumber,
                senha: req.body.password,
                nivel_acesso: 3,
                status_cadastro: 1
            }

            result = await dbConn.execute(sql, params)

            if (result) {
                return res.status(201).send({ "message": 'Cadastrado realizado com sucesso' })
            } else {
                return res.status(400).send({ "message": 'Ocorreu algum erro, entre em contato com o administrador' })
            }
        }
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}

exports.recoveryPass = async (req, res, next) => {
    try {
        const sql = `SELECT email FROM usuarios WHERE cpf = ?`
        const result = await dbConn.execute(sql, [req.body.cpf])

        if (result.length === 1) {
            return res.send(200).send({ "message": "E-mail de redefinição de senha enviado" })
        } else {
            return res.status(401).send({ "message": "Usuário não cadastrado no sistema" })
        }
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}

exports.allUsers = async (req, res) => {
    try {
        const sql = `SELECT id_usuario, cpf, nome, nivel_acesso, senha, status_cadastro FROM usuarios ORDER BY nivel_acesso`
        const results = await dbConn.execute(sql)

        res.status(200).send(results)
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}

exports.getUserData = async (req, res, next) => {

    try {
        const sql = `SELECT cpf, nome, email, telefone, data_de_nascimento FROM usuarios WHERE id_usuario = ?`
        const result = await dbConn.execute(sql, [req.body.user_id])

        const response = {
            user_id: req.body.user_id,
            cpf: result[0].cpf,
            name: result[0].nome,
            email: result[0].email,
            phoneNumber: result[0].telefone,
            birthday: result[0].data_de_nascimento
        }
        return res.status(200).send(response)

    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro,entre em contato com o administrador",
            "errorMessage": error
        })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const sql = `UPDATE usuarios SET ? WHERE id_usuario = "${req.body.user_id}"`
        const params = {
            cpf: req.body.cpf,
            nome: req.body.name,
            email: req.body.email,
            telefone: req.body.phoneNumber,
            data_de_nascimento: req.body.birthday,
        }
        await dbConn.execute(sql, params)

        return res.status(200).send({
            "message": "Dados atualizados com sucesso",
        })
    } catch (error) {
        return res.status(500).send({
            "message": "Ocorreu algum erro, entre em contato com o administrador",
            "errorMessage": error
        })
    }
}