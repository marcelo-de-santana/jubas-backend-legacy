-- Apresentação de Dados

--UMA QUERY QUE SELECIONA O ID,NOME E MAIS OS HORARIOS DISPONÍVEIS PARA DETERMINADO BARBEIRO

SELECT b.id, b.nome, e.horario_inicio, e.horario_fim, e.intervalo_inicio, e.intervalo_fim
FROM barbeiros AS b
INNER JOIN expediente AS e ON b.id = e.id_barbeiro;
