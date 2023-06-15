const dbConn = require("../services/mysql");

//METÓDO RESPONSÁVEL POR RETORNAR TODOS OS HORÁRIOS EM QUE OS BARBEIROS ESTÃO DISPONÍVEIS
exports.getBarberHour = async (req, res) => {
  try {
    const sql = `
        SELECT
            u.id_usuario as barber_id,
            u.nome AS barber_name,
            u.status_cadastro AS registration_status,
            h.id_horario AS time_id,
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
            u.nivel_acesso = 2
        ORDER BY
            u.nome, h.dia_da_semana
            `;
    const results = await dbConn.execute(sql);

    //ESTRUTURAÇÃO DA RESPOSTA DE FORMA QUE OS HORÁRIOS SEJAM RETORNADOS DE ACORDO COM O BARBEIRO
    let barberName;
    let allResults = [];
    results.forEach((value) => {
      if (barberName == null || barberName != value.barber_name) {
        allResults.push({
          barber_id: value.barber_id,
          barber_name: value.barber_name,
          registration_status: value.registration_status,
          times: [
            {
              time_id: value.time_id,
              weekday: value.weekday,
              start_time: value.start_time,
              end_time: value.end_time,
              start_interval: value.start_interval,
              end_interval: value.end_interval,
              status: value.status,
            },
          ],
        });
      } else {
        allResults[allResults.length - 1].times.push({
          time_id: value.time_id,
          weekday: value.weekday,
          start_time: value.start_time,
          end_time: value.end_time,
          start_interval: value.start_interval,
          end_interval: value.end_interval,
          status: value.status,
        });
      }
      barberName = value.barber_name;
    });
    return res.status(200).send(allResults);
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL POR BUSCAR AS ESPECIALIDADES DE ACORDO COM O ID DO BARBEIRO
exports.getBarberSpecialties = async (req, res) => {
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
        `;

    const result = await dbConn.execute(sql);

    let lastCategoryId;
    let allSpecialties = [];

    result.forEach((value) => {
      if (lastCategoryId !== value.id_categoria) {
        allSpecialties.push({
          category_id: value.id_categoria,
          category_name: value.nome_categoria,
          services: [],
        });
      }

      const currentCategory = allSpecialties[allSpecialties.length - 1];
      currentCategory.services.push({
        specialty_id: value.id_especialidade,
        service_id: value.id_servico,
        service_name: value.nome_servico,
        price: value.preco,
        duration: value.duracao,
      });

      lastCategoryId = value.id_categoria;
    });

    return res.status(200).send(allSpecialties);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL POR INSERIR UM HORÁRIO EM QUE O BARBEIRO ESTARÁ DISPONÍVEL
exports.setBarberHour = async (req, res) => {
  try {
    const { barber_id, statusButton } = req.body;
    const { start_time, end_time, start_interval, end_interval, status } =
      req.body.data;
    const sql = `INSERT INTO horarios_barbeiro SET ?`;
    let params = {
      id_barbeiro: barber_id,
      dia_da_semana: Object.keys(statusButton)[0],
      horario_inicio: start_time,
      horario_fim: end_time,
      intervalo_inicio: start_interval,
      intervalo_fim: end_interval,
      status: status,
    };
    await dbConn.execute(sql, params);

    return res.status(201).send({
      message: "Registro gravado com sucesso",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL POR CADASTRAR UM NOVO BARBEIRO COM STATUS INATIVO
exports.setRegisterBarber = async (req, res) => {
  try {
    const sql = `
        INSERT INTO
            usuarios (cpf, nome, data_de_cadastro, senha, nivel_acesso, status_cadastro)
        VALUES
            (?,?,?,?,?,?)`;
    const params = [
      req.body.cpf,
      req.body.name,
      new Date(Date.now()),
      req.body.password,
      2,
      0,
    ];

    await dbConn.execute(sql, params);

    return res.status(201).send({
      message: "Registro gravado com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

exports.setBarberSpecialty = async (req, res) => {
  try {
    const sql = `
        INSERT INTO
            especialidades_barbeiro (id_barbeiro, id_servico)
        VALUES
            (${req.body.barber_id}, ${req.body.service_id})
        `;
    await dbConn.execute(sql);
    return res.status(201).send({
      message: "Registro gravado com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL POR ATUALIZAR O NOME DO BARBEIRO
exports.updateBarberName = async (req, res) => {
  try {
    const sql = `
        UPDATE
            usuarios
        SET
            nome = "${req.body.barberName}"
        WHERE
            id_usuario = "${req.body.barberId}"
        `;
    await dbConn.execute(sql);

    return res.status(200).send({
      message: "Registro gravado com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

exports.updateBarberHour = async (req, res) => {
  try {
    const {
      time_id,
      start_time,
      end_time,
      start_interval,
      end_interval,
      status,
    } = req.body.data;
    let sql = `UPDATE horarios_barbeiro  SET ? WHERE id_horario = "${time_id}"`;
    let params = {
      horario_inicio: start_time,
      horario_fim: end_time,
      intervalo_inicio: start_interval,
      intervalo_fim: end_interval,
      status: status,
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

exports.deleteBarber = async (req, res) => {
  try {
    //ALTERA PERMISSÃO DE BARBEIRO PARA USUÁRIO
    let sql = `UPDATE usuarios SET nivel_acesso = 3 WHERE id_usuario = "${req.body.barberId}"`;
    await dbConn.execute(sql);

    //REMOVE O USUÁRIO DA LISTA DE HORÁRIOS DE BARBEIROS
    sql = `DELETE FROM horarios_barbeiro WHERE id_barbeiro = "${req.body.barberId}"`;
    await dbConn.execute(sql);

    return res.status(200).send({
      message: "Registro deletado com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

//MÉTODO RESPONSÁVEL POR EXCLUIR UM HORÁRIO EM QUE O BARBEIRO ESTÁ DISPONÍVEL
exports.deleleBarberHour = async (req, res) => {
  try {
    const sql = `DELETE FROM horarios_barbeiro WHERE id_horario = "${req.body.data.time_id}"`;
    await dbConn.execute(sql);

    return res.status(200).send({ message: "Registro deletado com sucesso" });
  } catch (error) {
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};

exports.deleteBarberSpecialty = async (req, res) => {
  try {
    const sql = `DELETE FROM especialidades_barbeiro WHERE id_barbeiro = ${req.body.barber_id} AND id_servico = ${req.body.service_id}`;

    await dbConn.execute(sql);

    return res.status(200).send({
      message: "Registro deletado com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Ocorreu algum erro, entre em contato com o administrador",
      errorMessage: error,
    });
  }
};
