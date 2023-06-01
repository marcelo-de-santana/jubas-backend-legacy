const dbConn = require('../services/mysql');

//MÉTODO RESPONSÁVEL PELO LOGIN DO USUÁRIO
exports.searchUserAndPassword = async (req, res, next) => {
    try {
        const sql = `SELECT id_usuario, nivel_acesso, status_cadastro FROM usuarios WHERE cpf = ? AND senha = ?`
        const params = [req.body.cpf, req.body.password]
        const results = await dbConn.execute(sql, params)

        if (results.length === 1) {
            return res.status(200).send({
                message: "Usuário autenticado",
                "credentials": results
            })
        } else {
            return res.status(401).send({ message: "Usuário ou senha incorretos" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//MÉTODO RESPONSÁVEL PELO CADASTRO DO USUÁRIO
exports.registerUser = async (req, res, next) => {
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
                return res.status(201).send({ message: 'Cadastrado realizado com sucesso' })
            } else {
                return res.status(400).send({ message: 'Ocorreu algum erro, entre em contato com o administrador' })
            }
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

exports.recoveryPass = async (req, res, next) => {
    try {
        const sql = `SELECT email FROM usuarios WHERE cpf = ?`
        const result = await dbConn.execute(sql, [req.body.cpf])

        if (result.length === 1) {
            return res.send(200).send({ message: "E-mail de redefinição de senha enviado" })
        } else {
            return res.status(401).send({ message: "Usuário não cadastrado no sistema" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//MÉTODO RESPONSÁVEL POR ALTERAR O STATUS DO CADASTRO DO USUÁRIO
exports.updateRegistrationStatus = async (req, res, next) => {
    try{
        let sql = `UPDATE usuarios SET ? WHERE id_usuario = "${req.body.barber_id}"`
        let params = {
            status_cadastro: req.body.status
        }
        await dbConn.execute(sql,params)
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


//MÉTODO RESPONSÁVEL POR RETORNAR TODOS OS USUÁRIOS
exports.getAllUsers = async (req, res) => {
    try {
        const sql = `SELECT id_usuario, cpf, nome, nivel_acesso, status_cadastro FROM usuarios ORDER BY nome`
        const results = await dbConn.execute(sql)

        res.status(200).send(results)
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//MÉTODO RESPONSÁVEL POR RETORNAR O USUÁRIO PELO CPF
exports.getUserByCPF = async (req, res, next) => {
        const sql = `SELECT id_usuario, nome, email, telefone, data_de_nascimento, nivel_acesso FROM usuarios WHERE ?`
        const result = await dbConn.execute(sql, [req.params])
        
		const userData = result.map(value => ({
		    user_id: value.id_usuario,
            user_name: value.nome,
            email: value.email,
            phoneNumber: value.telefone,
            birthday: value.data_de_nascimento,
            status_level: value.nivel_acesso
		
		}))

        return res.status(200).send(userData)
}

//MÉTODO RESPONSÁVEL POR EXCUIR UM USUÁRIO
exports.deleteUser = async (req, res, next) => {
	try {
		const sql = `DELETE FROM usuarios WHERE id_usuario = "${req.body.user_id}"`
		await dbConn.execute(sql)
		
		return res.status(200).send({ message: "Registro deletado com sucesso"})
	} catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
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
            message: "Dados atualizados com sucesso",
        })
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu algum erro, entre em contato com o administrador",
            errorMessage: error
        })
    }
}

//INSERIR USUÁRIO
exports.setUser = async (req, res, next) => {
	console.log(req.body)
	return res.status(200).send(req.body)
}

//ATUALIZAR USUÁRIO
//MUDAR O NÍVEL DE ACESSO DO USUARIO
