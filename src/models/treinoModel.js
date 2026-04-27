var database = require("../database/config");

function buscarTreinoPorUsuario(treinoId) {

  var instrucaoSql = `SELECT * FROM training t WHERE id_training = ${treinoId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(treinoId, observacao) {
  
  var instrucaoSql = `INSERT INTO (observacao, id_training) camara VALUES (${observacao}, ${treinoId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarTreinoPorUsuario,
  cadastrar
}
