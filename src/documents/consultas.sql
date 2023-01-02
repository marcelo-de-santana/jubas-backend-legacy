-- Apresentação de Dados

--UMA QUERY QUE SELECIONA O ID,NOME E MAIS OS HORARIOS DISPONÍVEIS PARA DETERMINADO BARBEIRO

SELECT b.id, b.nome, e.horario_inicio, e.horario_fim, e.intervalo_inicio, e.intervalo_fim, cd.horarios
FROM barbeiros AS b
INNER JOIN expediente AS e ON b.id = e.id_barbeiro
INNER JOIN calendario_diario AS cd
WHERE   cd.horarios >= e.horario_inicio
AND     cd.horarios < e.horario_fim
AND     cd.horarios < e.intervalo_inicio
OR      cd.horarios >= e.intervalo_fim
ORDER BY b.id, cd.horarios;

SELECT b.id, b.nome, cd.horarios
        FROM barbeiros AS b INNER JOIN expediente AS e ON b.id = e.id_barbeiro INNER JOIN calendario_diario AS cd
        WHERE cd.horarios >= e.horario_inicio AND cd.horarios < e.horario_fim AND cd.horarios < e.intervalo_inicio
        OR cd.horarios >= e.intervalo_fim ORDER BY b.id, cd.horarios;





SELECT b.id, b.nome, cd.horarios
        FROM barbeiros AS b INNER JOIN expediente AS e ON b.id = e.id_barbeiro INNER JOIN calendario_diario AS cd
        WHERE cd.horarios >= e.horario_inicio AND cd.horarios < e.horario_fim AND cd.horarios < e.intervalo_inicio
        OR cd.horarios >= e.intervalo_fim;


-- Filtrar horários disponíveis por barbeiro
SELECT e.id_barbeiro, c.horarios FROM expediente AS e INNER JOIN calendario_diario AS c
            WHERE c.horarios >= e.horario_inicio AND c.horarios < e.horario_fim AND c.horarios < e.intervalo_inicio
            OR c.horarios >= e.intervalo_fim ORDER BY e.id_barbeiro, c.horarios;

SELECT id, nome FROM barbeiros;