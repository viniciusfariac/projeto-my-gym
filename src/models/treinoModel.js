var database = require("../database/config");

function buscarTreinoPorUsuario(user_id) {

  var instrucaoSql = `SELECT * FROM training t WHERE user_id = ${user_id}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarTreino(user_id, name_training, suggest_day, type_training) {

  var instrucaoSql = `INSERT INTO training (user_id, name_training, suggest_day, type_training) VALUES (${user_id}, "${name_training}", "${suggest_day}", "${type_training}")`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function frequenciaNoMes(user_id) {
  var instrucaoSql = `
  SELECT 
	MONTH(tr.training_date) AS mes,
    YEAR(tr.training_date) AS ano,
    COUNT(DISTINCT DATE(tr.training_date)) AS frequencia
  FROM training_log tr
  JOIN training_exercise te ON te.id_training_exercise = tr.training_exercise_id
  JOIN training t ON t.id_training = te.training_id
  JOIN user u ON u.id_user = t.user_id
  WHERE 
    u.id_user = ${user_id}
  AND
    MONTH(tr.training_date) = MONTH(current_timestamp())
  GROUP BY mes, ano
  ORDER BY mes, ano;
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function horarioFrequente(user_id) {
  var instrucaoSql = `
  SELECT 
	COUNT(DISTINCT DATE(tr.training_date)) frequencia,
	HOUR(tr.training_date) horario
  FROM training_log tr
  JOIN training_exercise te ON te.id_training_exercise = tr.training_exercise_id
  JOIN training t ON t.id_training = te.training_id
  JOIN user u ON u.id_user = t.user_id
  WHERE 
    u.id_user = ${user_id}
  AND
    MONTH(tr.training_date) = MONTH(current_timestamp())
  GROUP BY HOUR(tr.training_date)
  ORDER BY frequencia DESC
  LIMIT 1;
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function metaMensal(user_id) {
  var instrucaoSql = `
  SELECT 
    COUNT(DISTINCT t.id_training) AS meta_semanal,
    COUNT(DISTINCT t.id_training) * 4 AS meta_mensal,
    COUNT(DISTINCT DATE(tl.training_date)) AS dias_treinados,
    CONCAT( ROUND((COUNT(DISTINCT DATE(tl.training_date)) / (COUNT(DISTINCT t.id_training) * 4)) * 100, 1),'%') AS progresso
  FROM user u
  INNER JOIN training t ON t.user_id = u.id_user AND t.status = 'Ativo'
  LEFT JOIN training_exercise te ON te.training_id = t.id_training
  LEFT JOIN training_log tl 
    ON tl.training_exercise_id = te.id_training_exercise
      AND MONTH(tl.training_date) = MONTH(CURRENT_DATE())
      AND YEAR(tl.training_date) = YEAR(CURRENT_DATE())
  WHERE
    u.id_user = ${user_id}
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarTreinoPorUsuario,
  cadastrarTreino,
  frequenciaNoMes,
  horarioFrequente,
  metaMensal
}
