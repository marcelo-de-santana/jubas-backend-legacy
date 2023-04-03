-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 23/03/2023 às 01:46
-- Versão do servidor: 8.0.32
-- Versão do PHP: 7.4.3-4ubuntu2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `barbearia`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agenda`
--

CREATE TABLE `agenda` (
  `id_atendimento` int NOT NULL,
  `id_cliente` int DEFAULT NULL,
  `id_barbeiro` int DEFAULT NULL,
  `id_servico` int DEFAULT NULL,
  `data` date NOT NULL,
  `horario` time NOT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `barbeiros`
--

CREATE TABLE `barbeiros` (
  `id` int NOT NULL,
  `nome` varchar(70) NOT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `data_de_nascimento` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL COMMENT 'Ativo/Inativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `barbeiros`
--

INSERT INTO `barbeiros` (`id`, `nome`, `telefone`, `data_de_nascimento`, `status`) VALUES
(1, 'Reis Melo', NULL, NULL, NULL),
(2, 'Gerson de Castro', NULL, NULL, NULL),
(3, 'Ulysses Guimaraes', NULL, NULL, NULL),
(4, 'Gabriel Navalha', NULL, NULL, NULL),
(5, 'João Marcos', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `caixa`
--

CREATE TABLE `caixa` (
  `id_operacao` int NOT NULL,
  `id_atendimento` int DEFAULT NULL,
  `preco` float DEFAULT NULL,
  `id_m_pagamento` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `calendario_diario`
--

CREATE TABLE `calendario_diario` (
  `horarios` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `calendario_diario`
--

INSERT INTO `calendario_diario` (`horarios`) VALUES
('06:00:00'),
('06:30:00'),
('07:00:00'),
('07:30:00'),
('08:00:00'),
('08:30:00'),
('09:00:00'),
('09:30:00'),
('10:00:00'),
('10:30:00'),
('11:00:00'),
('11:30:00'),
('12:00:00'),
('12:30:00'),
('13:00:00'),
('13:30:00'),
('14:00:00'),
('14:30:00'),
('15:00:00'),
('15:30:00'),
('16:00:00'),
('16:30:00'),
('17:00:00'),
('17:30:00'),
('18:00:00'),
('18:30:00'),
('19:00:00'),
('19:30:00'),
('20:00:00'),
('20:30:00');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

CREATE TABLE `categorias` (
  `id` int NOT NULL,
  `nome` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nome` varchar(70) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `data_de_nascimento` timestamp NULL DEFAULT NULL,
  `data_de_cadastro` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `cpf`, `email`, `nome`, `telefone`, `senha`, `data_de_nascimento`, `data_de_cadastro`) VALUES
(1, '000.000.000-00', 'jubasdeleao@gmail.com', 'Juba de Leão', '(61) 99999-9999', '12345678', '2001-01-01 00:00:00', '2022-10-16 23:46:29'),
(2, '000.111.000-00', 'rcasa@exemplo.com', 'Rodrigo Casa', '(61) 99999-8888', '12345678', '2002-01-02 00:00:00', '2022-11-24 02:00:00'),
(3, '111.111.000-00', 'josea@teste.com', 'Jose Antonio', '(61) 99322-0000', '12345678', '2000-03-03 00:00:00', '2022-12-15 03:00:00'),
(5, '111.222.333-00', 'gfa@hot.com', 'Fulano', '(61) 99999-0000', '12345678', '2000-01-12 00:00:00', '2023-03-19 23:56:42'),
(6, '222.222.222-22', 'jj@gmail.com', 'Joooaozinho', '(61) 99999-9999', '12345678', '2000-01-01 00:00:00', '2023-03-20 01:48:38');

-- --------------------------------------------------------

--
-- Estrutura para tabela `especialidades`
--

CREATE TABLE `especialidades` (
  `id` int NOT NULL,
  `id_barbeiro` int DEFAULT NULL,
  `id_servico` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `estoque`
--

CREATE TABLE `estoque` (
  `id_produto` int NOT NULL,
  `nome_produto` varchar(50) DEFAULT NULL,
  `quantidade` int DEFAULT '0',
  `validade` date DEFAULT NULL,
  `preco` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `gerencia`
--

CREATE TABLE `gerencia` (
  `id` int NOT NULL,
  `nome` varchar(70) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `horario_atendimento`
--

CREATE TABLE `horario_atendimento` (
  `id` int NOT NULL,
  `id_barbeiro` int NOT NULL,
  `dia_semana` varchar(20) DEFAULT NULL,
  `horario_inicio` time DEFAULT NULL,
  `horario_fim` time DEFAULT NULL,
  `intervalo_inicio` time DEFAULT NULL,
  `intervalo_fim` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `meios_pagamento`
--

CREATE TABLE `meios_pagamento` (
  `id` int NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `id` int NOT NULL,
  `id_categoria` int DEFAULT NULL,
  `nome` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `preco` float DEFAULT NULL,
  `duracao` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id_atendimento`),
  ADD KEY `fk_barbeiros_id_agenda` (`id_barbeiro`),
  ADD KEY `fk_clientes_id_agenda` (`id_cliente`);

--
-- Índices de tabela `barbeiros`
--
ALTER TABLE `barbeiros`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `caixa`
--
ALTER TABLE `caixa`
  ADD PRIMARY KEY (`id_operacao`),
  ADD KEY `fk_meios_pagamento_id_caixa` (`id_m_pagamento`);

--
-- Índices de tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- Índices de tabela `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_barbeiros_id_especialidades` (`id_barbeiro`),
  ADD KEY `fk_servicos_id_especialidades` (`id_servico`);

--
-- Índices de tabela `estoque`
--
ALTER TABLE `estoque`
  ADD PRIMARY KEY (`id_produto`);

--
-- Índices de tabela `horario_atendimento`
--
ALTER TABLE `horario_atendimento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_barbeiros_id_horario_atendimento` (`id_barbeiro`);

--
-- Índices de tabela `meios_pagamento`
--
ALTER TABLE `meios_pagamento`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_categorias_id_servicos` (`id_categoria`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `barbeiros`
--
ALTER TABLE `barbeiros`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `caixa`
--
ALTER TABLE `caixa`
  MODIFY `id_operacao` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `estoque`
--
ALTER TABLE `estoque`
  MODIFY `id_produto` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `horario_atendimento`
--
ALTER TABLE `horario_atendimento`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `fk_barbeiros_id_agenda` FOREIGN KEY (`id_barbeiro`) REFERENCES `barbeiros` (`id`),
  ADD CONSTRAINT `fk_clientes_id_agenda` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`);

--
-- Restrições para tabelas `caixa`
--
ALTER TABLE `caixa`
  ADD CONSTRAINT `fk_meios_pagamento_id_caixa` FOREIGN KEY (`id_m_pagamento`) REFERENCES `meios_pagamento` (`id`);

--
-- Restrições para tabelas `especialidades`
--
ALTER TABLE `especialidades`
  ADD CONSTRAINT `fk_barbeiros_id_especialidades` FOREIGN KEY (`id_barbeiro`) REFERENCES `barbeiros` (`id`),
  ADD CONSTRAINT `fk_servicos_id_especialidades` FOREIGN KEY (`id_servico`) REFERENCES `servicos` (`id`);

--
-- Restrições para tabelas `horario_atendimento`
--
ALTER TABLE `horario_atendimento`
  ADD CONSTRAINT `fk_barbeiros_id_horario_barbeiro` FOREIGN KEY (`id_barbeiro`) REFERENCES `barbeiros` (`id`);

--
-- Restrições para tabelas `servicos`
--
ALTER TABLE `servicos`
  ADD CONSTRAINT `fk_categorias_id_servicos` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
