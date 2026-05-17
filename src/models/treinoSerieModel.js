var database = require("../database/config");

function cadastrarSerie(set_order, training_log_id, rep, weight) {
    var instrucaoSql = `
    INSERT INTO training_set (set_order, training_log_id, rep, weight) VALUES
    (${set_order}, ${training_log_id}, ${rep}, ${weight})
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarLog(training_exercise_id) {
    var instrucaoSql = `
    INSERT INTO training_log (training_exercise_id) VALUES
    (${training_exercise_id})
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarSerie,
    cadastrarLog
}