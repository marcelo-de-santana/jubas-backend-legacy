-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 19/04/2023 às 04:20
-- Versão do servidor: 8.0.33
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

--
-- Despejando dados para a tabela `barbeiros`
--

INSERT INTO `barbeiros` (`id`, `cpf_barbeiro`, `nome`, `telefone`, `data_de_nascimento`, `status`) VALUES
(1, '', 'Reis Melo', NULL, NULL, 1),
(2, '', 'Gerson de Castro', NULL, NULL, 1),
(3, '', 'Ulysses Guimaraes', NULL, NULL, 1),
(4, '', 'Gabriel Navalha', NULL, NULL, 0),
(5, '', 'João Marcos', NULL, NULL, 0);

--
-- Despejando dados para a tabela `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nome_categoria`) VALUES
(1, 'Corte de cabelo masculino'),
(2, 'Serviços de barba'),
(3, 'Tratamentos capilares'),
(4, 'Depilação'),
(5, 'Cuidados com a pele'),
(6, 'Outros serviços');

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `cpf`, `email`, `nome`, `telefone`, `senha`, `data_de_nascimento`, `data_de_cadastro`) VALUES
(1, '000.000.000-00', 'jubasdeleao@gmail.com', 'Juba de Leão', '(61) 99999-9999', '12345678', '2001-01-01 00:00:00', '2022-10-16 23:46:29'),
(2, '000.111.000-00', 'rcasa@exemplo.com', 'Rodrigo Casa', '(61) 99999-8888', '12345678', '2002-01-02 00:00:00', '2022-11-24 02:00:00'),
(3, '111.111.000-00', 'josea@teste.com', 'Jose Antonio', '(61) 99322-0000', '12345678', '2000-03-03 00:00:00', '2022-12-15 03:00:00'),
(5, '111.222.333-00', 'gfa@hot.com', 'Fulano', '(61) 99999-0000', '12345678', '2000-01-12 00:00:00', '2023-03-19 23:56:42'),
(6, '222.222.222-22', 'jj@gmail.com', 'Joooaozinho', '(61) 99999-9999', '12345678', '2000-01-01 00:00:00', '2023-03-20 01:48:38'),
(7, '112.312.321-33', 'asdasd@foma.com', 'Masrecleoo', '(11) 1111-11111', '12345678', '1999-12-01 00:00:00', '2023-04-15 00:42:59'),
(8, '111.000.000-00', 'jm@pp.com', 'Jonathan Melo', '(11) 1111-11111', '12345678', '1993-11-11 00:00:00', '2023-04-15 00:43:01'),
(9, '111.110.000-00', 'jm@pp.com', 'Jonathan Melo', '(11) 1111-11111', '12345678', '1993-11-11 00:00:00', '2023-04-15 00:44:01'),
(10, '111.110.000-01', 'jm@pp.com', 'Jonathan Melo', '(11) 1111-11111', '12345678', '1993-11-11 00:00:00', '2023-04-15 00:44:25'),
(11, '222.222.111-11', 'asdsad@off.com', 'OOOcjadjasdas', '(12) 23123-233', '12345678', '2009-11-11 00:00:00', '2023-04-15 00:48:15'),
(12, '222.222.111-12', 'asdsad@off.com', 'OOOcjadjasdas', '(12) 23123-233', '12345678', '2009-11-11 00:00:00', '2023-04-15 00:52:45'),
(13, '222.222.111-13', 'asdsad@off.com', 'OOOcjadjasdas', '(12) 23123-233', '12345678', '2009-11-11 00:00:00', '2023-04-15 00:53:31'),
(14, '222.222.111-14', 'asdsad@off.com', 'OOOcjadjasdas', '(12) 23123-233', '12345678', '2009-11-11 00:00:00', '2023-04-15 00:54:01'),
(15, '222.222.111-15', 'asdsad@off.com', 'OOOcjadjasdas', '(12) 23123-233', '12345678', '2009-11-11 00:00:00', '2023-04-15 00:54:42'),
(16, '222.222.111-16', 'asdsad@off.com', 'OOOcjadjasdas', '(12) 23123-233', '12345678', '2009-11-11 00:00:00', '2023-04-15 00:57:49');

--
-- Despejando dados para a tabela `disponibilidade`
--

INSERT INTO `disponibilidade` (`tipo`, `nome`) VALUES
(1, 'Ativo'),
(2, 'Inativo'),
(3, 'Pendente');

--
-- Despejando dados para a tabela `especialidades`
--

INSERT INTO `especialidades` (`id`, `id_barbeiro`, `id_servico`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 3, 1);

--
-- Despejando dados para a tabela `horarios_barbeiro`
--

INSERT INTO `horarios_barbeiro` (`id_horario`, `id_barbeiro`, `dia_semana`, `horario_inicio`, `horario_fim`, `intervalo_inicio`, `intervalo_fim`) VALUES
(1, 1, 'Monday', '08:00:00', '16:00:00', '12:00:00', '13:00:00');

--
-- Despejando dados para a tabela `permissoes_acesso`
--

INSERT INTO `permissoes_acesso` (`nivel`, `descricao`) VALUES
(1, 'gerente'),
(2, 'barbeiro'),
(3, 'cliente'),
(4, 'fornecedor');

--
-- Despejando dados para a tabela `servicos`
--

INSERT INTO `servicos` (`id_servico`, `id_categoria`, `nome_servico`, `preco`, `duracao`) VALUES
(1, 1, 'Corte clássico com tesoura', 0, '00:40:00'),
(2, 1, 'Corte moderno com máquina', 0, '00:20:00'),
(3, 1, 'Corte degradê com máquina', 0, '00:40:00'),
(4, 1, 'Corte com tesoura e navalha', 0, '00:50:00'),
(5, 2, 'Barba completa com tesoura e navalha', 0, '00:30:00'),
(6, 2, 'Barba com máquina', 0, '00:05:00'),
(7, 2, 'Aparar barba', 0, '00:10:00'),
(8, 2, 'Modelar barba', 0, '00:15:00'),
(9, 3, 'Lavagem de cabelo', 0, '00:10:00'),
(10, 3, 'Hidratação capilar', 0, '00:20:00'),
(11, 3, 'Tratamento para queda de cabelo', 0, '00:30:00'),
(12, 3, 'Tratamento para cabelos oleosos', 0, '00:20:00'),
(13, 3, 'Tratamento para cabelos ressecados', 0, '00:30:00'),
(14, 4, 'Depilação facial com cera', 0, '00:15:00'),
(15, 4, 'Depilação corporal com cera', 0, '01:00:00'),
(16, 4, 'Depilação íntima masculina', 0, '01:00:00'),
(17, 5, 'Limpeza facial', 0, '00:30:00'),
(18, 5, 'Massagem facial', 0, '00:30:00'),
(19, 6, 'Manicure masculina', 0, '00:20:00'),
(20, 6, 'Pedicure masculina', 0, '00:20:00'),
(21, 6, 'Design de sobrancelha', 0, '00:20:00'),
(22, 6, 'Coloração de cabelo', 0, '00:45:00');

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `cpf`, `nome`, `email`, `data_de_nascimento`, `data_de_cadastro`, `telefone`, `senha`, `nivel_acesso`, `status_cadastro`) VALUES
(1, '000.000.000-00', 'Juba de Leão', 'jubasdeleao@gmail.com', NULL, '2022-10-16', '(99) 99999-9999', '12345678', 1, 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
