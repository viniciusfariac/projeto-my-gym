var userExerciseModel = require("../models/userExerciseModel")

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id_exercise = req.body.idExerciseServer;
    var id_training = req.body.idTrainingServer;
    var set = req.body.setServer;

    // Faça as validações dos valores
    if (id_exercise == undefined) {
        res.status(400).send("Sem id exercise definido!");
    } else if (id_training == undefined) {
        res.status(400).send("Sem id do treino definido!");
    } else if (set == undefined) {
        res.status(400).send("Sem série definida!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        userExerciseModel.cadastrarExercisioNoTreino(id_training, id_exercise, set)
            .then(
                function (resultado) {
                    res.status(200).json({
                        insertId: resultado.insertId,
                        resultado: true
                    })
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}