var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM exercise WHERE id_exercise = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT url_image, exercise_name, muscle_group, description FROM exercise`;

  return database.executar(instrucaoSql);
}

function buscarPorNome(nome) {
  var instrucaoSql = `SELECT * FROM exercise WHERE exercise_name = '${nome}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(url_image, exercise_name, muscle_group, description) {
  var instrucaoSql = `INSERT INTO exercise (url_image, exercise_name, muscle_group, description) VALUES ('${url_image}', '${exercise_name}', '${muscle_group}', '${description}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorNome, buscarPorId, cadastrar, listar };
