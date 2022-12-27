
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
id_barbeiro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
horario_inico VARCHAR(5),
horario_fim VARCHAR(5),
intervalo_inicio VARCHAR(5),
intervalo_fim VARCHAR(5)
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

INSERT INTO expediente (id_barbeiro,horario) VALUES
(1, '08:00'),
(1, '08:30'),
(2, '08:00'),
(2, '08:30');

INSERT INTO barbeiros (id, nome) VALUES
(1, 'Reis Melo'),
(2, 'Gerson de Castro'),
(3, 'Ulysses Guimaraes'),
(4, 'Gabriel Navalha'),
(5, 'João Marcos');



----------------------------------------------------------