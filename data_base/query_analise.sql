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