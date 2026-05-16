var database = require("../database/config");

function pesoTotalNoMes(id_user, date) {
    var instrucaoSql = `
    SELECT 
    SUM(ts.weight) peso_total
    FROM
        training t
    JOIN training_exercise te ON te.training_id = t.id_training
    JOIN training_log tr ON tr.training_exercise_id = te.id_training_exercise
    JOIN training_set ts ON ts.training_log_id = tr.id_training_log
    WHERE 
        tr.training_date >= SUBDATE(NOW(),INTERVAL ${date} DAY)
    AND
        t.user_id = ${id_user};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function diaComparecido(id_user) {
    var instrucaoSql = `
    SELECT 
    DISTINCT DATE(tr.training_date) AS frequencia,
	MONTH(tr.training_date) AS mes,
    YEAR(tr.training_date) AS ano,
    DAY(tr.training_date) AS dia
    FROM training_log tr
    JOIN training_exercise te ON te.id_training_exercise = tr.training_exercise_id
    JOIN training t ON t.id_training = te.training_id
    JOIN user u ON u.id_user = t.user_id
    WHERE 
        u.id_user = ${id_user}
    AND
        MONTH(tr.training_date) = MONTH(current_timestamp())
    ORDER BY mes, ano;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comparacaoDeTreinos(id_training_exercise) {
    var instrucaoSql = `
    SELECT 
    atual.training_log_id AS treino_atual,
    anterior.training_log_id AS treino_anterior,
    atual.total_reps AS reps_atuais,
    anterior.total_reps AS reps_anteriores,
    (atual.total_reps - anterior.total_reps) AS progresso_reps,
    atual.total_volume AS volume_atual,
    anterior.total_volume AS volume_anterior,
    (atual.total_volume - anterior.total_volume) AS progresso_volume
    FROM (
        SELECT 
            ts.training_log_id,
            SUM(ts.rep) AS total_reps,
            SUM(ts.rep * ts.weight) AS total_volume
        FROM training_set ts
        JOIN training_log tl
            ON tl.id_training_log = ts.training_log_id
        WHERE tl.training_exercise_id = ${id_training_exercise}
        GROUP BY ts.training_log_id
        ORDER BY ts.training_log_id DESC
        LIMIT 1
    ) AS atual
    JOIN (
        SELECT 
            ts.training_log_id,
            SUM(ts.rep) AS total_reps,
            SUM(ts.rep * ts.weight) AS total_volume
        FROM training_set ts
        JOIN training_log tl
            ON tl.id_training_log = ts.training_log_id
        WHERE tl.training_exercise_id = ${id_training_exercise}
        GROUP BY ts.training_log_id
        ORDER BY ts.training_log_id DESC
        LIMIT 1 OFFSET 1
    ) AS anterior;
    `


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesoTotalNoExercicio(id_training_exercise) {
    var instrucaoSql = `
    SELECT
	MAX(weight) pr
    FROM
        training_set ts
    JOIN training_log tl ON tl.id_training_log = ts.training_log_id
    JOIN training_exercise te ON te.id_training_exercise = tl.training_exercise_id
    WHERE te.id_training_exercise = ${id_training_exercise}
    `


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comparacaoEntreSemanas(id_user) {
    var instrucaoSql = `
    SELECT 
	DAYOFWEEK(tr.training_date) dia_semana,
    COUNT(DISTINCT DATE(tr.training_date)) AS frequencia
    FROM training_log tr
    JOIN training_exercise te ON te.id_training_exercise = tr.training_exercise_id
    JOIN training t ON t.id_training = te.training_id
    JOIN user u ON u.id_user = t.user_id
    WHERE 
        u.id_user = ${id_user}
    AND
        MONTH(tr.training_date) = MONTH(NOW())
    GROUP BY dia_semana
    ORDER BY dia_semana DESC;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function frequenciaSemana(id_user) {
    var instrucaoSql = `
    SELECT 
    WEEK(tr.training_date, 1) AS semana,
    COUNT(DISTINCT DATE(tr.training_date)) AS frequencia_semana
    FROM training_log tr
    JOIN training_exercise te 
        ON te.id_training_exercise = tr.training_exercise_id
    JOIN training t 
        ON t.id_training = te.training_id
    WHERE t.user_id = ${id_user}
    AND MONTH(tr.training_date) = MONTH(CURRENT_DATE())
    AND YEAR(tr.training_date) = YEAR(CURRENT_DATE())
    GROUP BY WEEK(tr.training_date, 1)
    ORDER BY semana;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pesoTotalNoMes,
    diaComparecido,
    comparacaoDeTreinos,
    pesoTotalNoExercicio,
    pesoTotalNoExercicio,
    comparacaoEntreSemanas,
    frequenciaSemana
}