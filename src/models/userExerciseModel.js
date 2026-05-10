var database = require("../database/config");

// function buscarUltimosExercicios(idAquario, limite_linhas) {

//     var instrucaoSql = `SELECT 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         momento,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
//                     FROM medida
//                     WHERE fk_aquario = ${idAquario}
//                     ORDER BY id DESC LIMIT ${limite_linhas}`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function buscarUsuariosPorExercicio(idAquario) {

//     var instrucaoSql = `SELECT 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         FROM medida WHERE fk_aquario = ${idAquario} 
//                     ORDER BY id DESC LIMIT 1`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

function cadastrarExercisioNoTreino(training_id, exercise_id, set_exercise) {

    var instrucaoSql = `
    INSERT INTO  training_exercise(exercise_id, training_id, set_exercise)  VALUES (${exercise_id}, ${training_id}, ${set_exercise})`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTreinoExercisioUsuario(training_id) {
    var instrucaoSql = `
    SELECT 
	e.url_image,
    e.exercise_name,
    e.description,
    e.id_exercise,
    t.user_id,
    t.name_training,
    t.type_training,
    te.set_exercise
    FROM
        training_exercise te
    JOIN training t ON te.training_id = t.id_training
    JOIN exercise e ON e.id_exercise = te.exercise_id
    WHERE 
        t.id_training = ${training_id}
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarExercisioNoTreino,
    listarTreinoExercisioUsuario
}
