var database = require("../database/config");

function searchGroup() {

  var instrucaoSql = `SELECT * FROM muscle_group`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  searchGroup
}