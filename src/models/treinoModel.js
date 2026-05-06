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


module.exports = {
  buscarTreinoPorUsuario,
  cadastrarTreino
}
