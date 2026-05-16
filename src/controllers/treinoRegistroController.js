var treinoRegistroModel = require("../models/treinoRegistroModel")

function pesoTotalNoMes(req, res) {
    var id_user = req.params.idUser
    var date = req.params.date

    if (id_user == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else if (date == undefined) {
        res.status(400).send("A data do treino está undefined!")
    } else {
        treinoRegistroModel.pesoTotalNoMes(id_user, date)
            .then(function (resultado) {
                res.status(200).json(resultado)
            })
            .catch(function (error) {
                res.status(500).json(error.sqlMessage)
            })
    }
}

function diaComparecido(req, res) {
    var id_user = req.params.idUser

    if (id_user == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else {
        treinoRegistroModel.diaComparecido(id_user)
            .then(function (resultado) {
                res.status(200).json(resultado)
            })
            .catch(function (error) {
                res.status(500).json(error.sqlMessage)
            })
    }
}

function comparacaoDeTreinos(req, res) {
    var id_training_exercise = req.params.idTrainingExercise

    if (id_training_exercise == undefined) {
        res.status(400).send("O id do exercicio está undefined!");
    } else {
        treinoRegistroModel.comparacaoDeTreinos(id_training_exercise)
            .then(function (resultado) {
                res.status(200).json(resultado)
            })
            .catch(function (error) {
                res.status(500).json(error.sqlMessage)
            })
    }
}

function pesoTotalNoExercicio(req, res) {
    var id_training_exercise = req.params.idTrainingExercise

    if (id_training_exercise == undefined) {
        res.status(400).send("O id do exercicio está undefined!");
    } else {
        treinoRegistroModel.pesoTotalNoExercicio(id_training_exercise)
            .then(function (resultado) {
                res.status(200).json(resultado)
            })
            .catch(function (error) {
                res.status(500).json(error.sqlMessage)
            })
    }
}

function comparacaoEntreSemanas(req, res) {
    var id_user = req.params.idUser

    if (id_user == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else {
        treinoRegistroModel.comparacaoEntreSemanas(id_user)
            .then(function (resultado) {
                res.status(200).json(resultado)
            })
            .catch(function (error) {
                res.status(500).json(error.sqlMessage)
            })
    }
}

function frequenciaSemana(req, res) {
    var id_user = req.params.idUser

    if (id_user == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else {
        treinoRegistroModel.frequenciaSemana(id_user)
            .then(function (resultado) {
                res.status(200).json(resultado)
            })
            .catch(function (error) {
                res.status(500).json(error.sqlMessage)
            })
    }
}


module.exports = {
    pesoTotalNoMes,
    comparacaoDeTreinos,
    diaComparecido,
    pesoTotalNoExercicio,
    comparacaoEntreSemanas,
    frequenciaSemana
}