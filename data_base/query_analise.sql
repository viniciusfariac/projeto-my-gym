USE my_gym;

-- SELECTS TESTES

SELECT
	te.id_training_exercise,
	t.name_training,
    e.exercise_name
FROM
	training t
JOIN training_exercise te ON t.id_training = te.training_id
JOIN exercise e ON e.id_exercise = te.exercise_id;


-- Select com todos os dados
SELECT 
	u.username,
    t.name_training,
    e.exercise_name,
    tr.training_date,
    ts.set_order,
    ts.rep,
    ts.weight,
    ts.type_set
FROM
	user u
JOIN training t ON u.id_user = t.user_id
JOIN training_exercise te ON te.training_id = t.id_training
JOIN exercise e ON e.id_exercise = te.exercise_id
JOIN training_log tr ON tr.training_exercise_id = te.id_training_exercise
JOIN training_set ts ON ts.training_log_id = tr.id_training_log;


SELECT 
	u.username,
    t.name_training,
    e.exercise_name,
    tr.training_date,
    ts.set_order,
    ts.rep,
    ts.weight,
    ts.type_set
FROM
	user u
JOIN training t ON u.id_user = t.user_id
JOIN training_exercise te ON te.training_id = t.id_training
JOIN exercise e ON e.id_exercise = te.exercise_id
JOIN training_log tr ON tr.training_exercise_id = te.id_training_exercise
JOIN training_set ts ON ts.training_log_id = tr.id_training_log
WHERE
	u.username = 'Vinicius'
AND
	t.name_training = 'Upper A'
AND 
	e.exercise_name = 'Supino inclinado com halteres'
ORDER BY tr.training_date, ts.set_order;

-- Frequencia geral
SELECT 
    DISTINCT DATE(tr.training_date) dia,
    DAYNAME(tr.training_date) dia_semana
FROM
	user u
JOIN training t ON u.id_user = t.user_id
JOIN training_exercise te ON te.training_id = t.id_training
JOIN exercise e ON e.id_exercise = te.exercise_id
JOIN training_log tr ON tr.training_exercise_id = te.id_training_exercise
JOIN training_set ts ON ts.training_log_id = tr.id_training_log
WHERE
	u.username = 'Vinicius';
    
-- Frequência no mês
SELECT 
	MONTH(tr.training_date) AS mes,
    YEAR(tr.training_date) AS ano,
    COUNT(DISTINCT tr.training_date) AS frequencia
FROM training_log tr
JOIN training_exercise te ON te.id_training_exercise = tr.training_exercise_id
JOIN training t ON t.id_training = te.training_id
JOIN user u ON u.id_user = t.user_id
WHERE u.username = 'vinicius'
GROUP BY mes, ano
ORDER BY mes, ano;

-- Frequência por semana
SELECT 
	DAYNAME(tr.training_date) dia_semana,
    COUNT(DISTINCT DATE(tr.training_date)) AS frequencia
FROM training_log tr
JOIN training_exercise te ON te.id_training_exercise = tr.training_exercise_id
JOIN training t ON t.id_training = te.training_id
JOIN user u ON u.id_user = t.user_id
WHERE u.username = 'vinicius'
GROUP BY dia_semana
ORDER BY frequencia DESC;

-- Frequência por semana no mês
SELECT 
	DAYNAME(tr.training_date) dia_semana,
    COUNT(DISTINCT DATE(tr.training_date)) AS frequencia
FROM training_log tr
JOIN training_exercise te ON te.id_training_exercise = tr.training_exercise_id
JOIN training t ON t.id_training = te.training_id
JOIN user u ON u.id_user = t.user_id
WHERE 
	u.username = 'vinicius'
AND
	MONTH(tr.training_date) = 4
GROUP BY dia_semana
ORDER BY frequencia DESC;

-- Maior carga em determinado exercício
SELECT 
    t.name_training,
    e.exercise_name,
    MAX(ts.weight) pr
FROM
	user u
JOIN training t ON u.id_user = t.user_id
JOIN training_exercise te ON te.training_id = t.id_training
JOIN exercise e ON e.id_exercise = te.exercise_id
JOIN training_log tr ON tr.training_exercise_id = te.id_training_exercise
JOIN training_set ts ON ts.training_log_id = tr.id_training_log
WHERE
	u.username = 'Vinicius'
AND
	t.name_training = 'Upper A'
AND 
	e.exercise_name = 'Supino inclinado com halteres'
ORDER BY tr.training_date, ts.set_order;

-- Quantas vezes fez cada treino
SELECT
    DISTINCT t.name_training, 
    COUNT(DISTINCT DATE(tl.training_date)) quantas_vezes
FROM
	training t
JOIN user u ON u.id_user = t.user_id
JOIN training_exercise te ON te.training_id = t.id_training
JOIN training_log tl ON tl.training_exercise_id = te.id_training_exercise
GROUP BY t.name_training;

-- Média de reps por exercício
SELECT 
    t.name_training,
    e.exercise_name,
    TRUNCATE(AVG(ts.rep), 2) media_rep
FROM
	user u
JOIN training t ON u.id_user = t.user_id
JOIN training_exercise te ON te.training_id = t.id_training
JOIN exercise e ON e.id_exercise = te.exercise_id
JOIN training_log tr ON tr.training_exercise_id = te.id_training_exercise
JOIN training_set ts ON ts.training_log_id = tr.id_training_log
WHERE
	u.username = 'Vinicius'
AND
	t.name_training = 'Upper A'
AND 
	e.exercise_name = 'Supino inclinado com halteres'
ORDER BY tr.training_date, ts.set_order;

-- Evolução de carga
SELECT 
    DISTINCT (tr.training_date),
    MAX(ts.weight)
FROM
	user u
JOIN training t ON u.id_user = t.user_id
JOIN training_exercise te ON te.training_id = t.id_training
JOIN exercise e ON e.id_exercise = te.exercise_id
JOIN training_log tr ON tr.training_exercise_id = te.id_training_exercise
JOIN training_set ts ON ts.training_log_id = tr.id_training_log
WHERE
	u.username = 'Vinicius'
AND
	t.name_training = 'Upper A'
AND 
	e.exercise_name = 'Supino inclinado com halteres'
GROUP BY tr.training_date;

-- Média de rep por treino
SELECT 
	DATE(tr.training_date),
    TRUNCATE(AVG(ts.rep), 2)
FROM
	user u
JOIN training t ON u.id_user = t.user_id
JOIN training_exercise te ON te.training_id = t.id_training
JOIN exercise e ON e.id_exercise = te.exercise_id
JOIN training_log tr ON tr.training_exercise_id = te.id_training_exercise
JOIN training_set ts ON ts.training_log_id = tr.id_training_log
WHERE
	u.username = 'Vinicius'
AND
	t.name_training = 'Upper A'
AND 
	e.exercise_name = 'Supino inclinado com halteres'
GROUP BY DATE(tr.training_date);