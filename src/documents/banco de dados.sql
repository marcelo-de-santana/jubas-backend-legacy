
----------------------------------------------------------

-- Estrutura para agenda de atendimentos

CREATE TABLE agenda(
  numero_atendimento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  id_barbeiro INT NOT NULL,
  dia_horario DATETIME NOT NULL  
);

----------------------------------------------------------
-- Estrutura para tabela cliente

CREATE TABLE clientes (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  cpf VARCHAR(15) NOT NULL UNIQUE KEY,
  email VARCHAR(50),
  nome VARCHAR(70) NOT NULL,
  telefone VARCHAR(20),
  senha VARCHAR(255) NOT NULL,
  data_de_nascimento TIMESTAMP,
  data_de_cadastro TIMESTAMP
);

----------------------------------------------------------

-- Estrutura para tabela barbeiro

CREATE TABLE barbeiros (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  telefone varchar(50),
  status BOOLEAN
);

----------------------------------------------------------

-- Estrutura para tabela expediente do barbeiro

CREATE TABLE expediente(
id_barbeiro INT NOT NULL PRIMARY KEY,
horario_inicio TIME,
horario_fim TIME,
intervalo_inicio TIME,
intervalo_fim TIME
);
----------------------------------------------------------

-- Estrutura para tabela de horarios de atendimento
CREATE TABLE calendario_diario(
  horarios TIME
);

----------------------------------------------------------

-- Estrutura para tabela de estoque

CREATE TABLE estoque(
  id_produto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_produto VARCHAR(50),
  quantidade INT DEFAULT 0,
  validade DATE,
  preco FLOAT
);

----------------------------------------------------------

-- Estrutura para tabela caixa

CREATE TABLE caixa(
  id_operacao INT NOT NULL AUTO_INCREMENT,
  id_funcionario INT,
  preco FLOAT,
  m_pagamento VARCHAR(30)
);

----------------------------------------------------------

-- Estrutura para tabela caixa

CREATE TABLE gerencia(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  nome VARCHAR (70) NOT NULL,
  email VARCHAR(50) NOT NULL,
  senha VARCHAR(255)
);

----------------------------------------------------------

INSERT INTO clientes (cpf,email,nome,telefone,senha,data_de_nascimento,data_de_cadastro) VALUES
('000.000.000-00', 'jubasdeleao@gmail.com', 'Juba de Leão', '(61) 99999-9999','12345678','2001-01-01 00:00:00' ,'2022-10-16 23:46:29' ),
("000.111.000-00","rcasa@exemplo.com","Rodrigo Casa","(61) 99999-8888","12345678","2002-01-02 00:00:00","2022-11-24 02:00:00"),
("111.111.000-00","josea@teste.com","Jose Antonio","(61) 99322-0000","12345678","2000-03-03 00:00:00","2022-12-15 03:00:00");

INSERT INTO barbeiros (id, nome) VALUES
(1, 'Reis Melo'),
(2, 'Gerson de Castro'),
(3, 'Ulysses Guimaraes'),
(4, 'Gabriel Navalha'),
(5, 'João Marcos');

INSERT INTO expediente (id_barbeiro,horario_inicio,horario_fim,intervalo_inicio,intervalo_fim) VALUES
(1, '08:00:00','16:00:00','12:00:00','13:00:00'),
(2, '08:30:00','16:30:00','12:30:00','13:30:00'),
(3, '10:00:00','18:00:00','14:00:00','15:00:00');

INSERT INTO calendario_diario (horarios) VALUES
('06:00:00'),('06:30:00'),
('07:00:00'),('07:30:00'),
('08:00:00'),('08:30:00'),
('09:00:00'),('09:30:00'),
('10:00:00'),('10:30:00'),
('11:00:00'),('11:30:00'),
('12:00:00'),('12:30:00'),
('13:00:00'),('13:30:00'),
('14:00:00'),('14:30:00'),
('15:00:00'),('15:30:00'),
('16:00:00'),('16:30:00'),
('17:00:00'),('17:30:00'),
('18:00:00'),('18:30:00'),
('19:00:00'),('19:30:00'),
('20:00:00'),('20:30:00');
----------------------------------------------------------