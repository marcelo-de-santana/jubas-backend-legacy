const dbConn = require("../services/mysql");

//MÉTODO RESPONSÁVEL POR RETORNAR TODOS OS USUÁRIOS
exports.getAllUsers = async (req, res) => {
  try {
    const sql = `SELECT id_usuario, cpf, nome, nivel_acesso, status_cadastro FROM usuarios ORDER BY nome`;
    const results = await dbConn.execute(sql);

    res.status(200).send(results);
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL PELO LOGIN DO USUÁRIO
exports.searchUserAndPassword = async (req, res) => {
  try {
    const sql = `
        SELECT
            id_usuario AS ID, CPF, nome AS NAME, nivel_acesso AS LEVEL
            FROM usuarios
            WHERE cpf = ? AND senha = ? AND status_cadastro = 1`;
    const params = [req.body.cpf, req.body.password];
    const results = await dbConn.execute(sql, params);

    if (results.length === 1) {
      return res.status(200).send({
        message: "Usuário autenticado",
        credentials: results[0],
      });
    } else {
      return res.status(401).send({ message: "Usuário ou senha incorretos" });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL PELO CADASTRO DO USUÁRIO
exports.registerUser = async (req, res) => {
  try {
    let sql = `SELECT COUNT(*) AS valor FROM usuarios WHERE cpf = ?`;
    let result = await dbConn.execute(sql, [req.body.cpf]);

    //VERIFICA A EXISTÊNCIA DO CPF
    if (result[0].valor === 1) {
      return res.status(400).send({ message: "CPF já cadastrado" });
    } else {
      sql = `INSERT INTO usuarios SET ?`;
      const params = {
        cpf: req.body.cpf,
        nome: req.body.name,
        email: req.body.email,
        data_de_nascimento: new Date(req.body.birthday),
        data_de_cadastro: new Date(Date.now()),
        telefone: req.body.phoneNumber,
        senha: req.body.password,
        nivel_acesso: 3,
        status_cadastro: 1,
      };

      result = await dbConn.execute(sql, params);

      if (result) {
        return res
          .status(201)
          .send({ message: "Cadastrado realizado com sucesso" });
      } else {
        return res.status(400).send({
          message: "Ocorreu algum erro, entre em contato com o administrador",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL POR ALTERAR O STATUS DO CADASTRO DO USUÁRIO
exports.updateRegistrationStatus = async (req, res, next) => {
  try {
    let sql = `UPDATE usuarios SET ? WHERE id_usuario = "${req.body.barber_id}"`;
    let params = {
      status_cadastro: req.body.status,
    };
    await dbConn.execute(sql, params);
    return res.status(200).send({
      message: "Registro gravado com sucesso",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL PELA RECUPERAÇÃO DE SENHA
exports.recoveryPass = async (req, res) => {
  try {
    const { cpf, password } = req.body;
    let sql = `SELECT COUNT(*) AS VALUE FROM usuarios WHERE cpf = ?`;
    const result = await dbConn.execute(sql, cpf);
    if (result[0].VALUE === 0) {
      return res.status(401).send({ message: "Usuário não cadastrado" });
    } else {
      sql = `UPDATE usuarios SET senha = "${password}" WHERE cpf = "${cpf}"`;
      await dbConn.execute(sql);
      return res
        .status(200)
        .send({ message: "Nova senha gravada com sucesso" });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const sql = `UPDATE usuarios SET ? WHERE id_usuario = "${req.body.user_id}"`;
    const params = {
      cpf: req.body.cpf,
      nome: req.body.name,
      email: req.body.email,
      telefone: req.body.phoneNumber,
      data_de_nascimento: req.body.birthday,
    };
    await dbConn.execute(sql, params);

    return res.status(200).send({
      message: "Dados atualizados com sucesso",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL POR EXCUIR UM USUÁRIO
exports.deleteUser = async (req, res, next) => {
  try {
    const sql = `DELETE FROM usuarios WHERE id_usuario = "${req.body.user_id}"`;
    await dbConn.execute(sql);

    return res.status(200).send({ message: "Registro deletado com sucesso" });
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};
