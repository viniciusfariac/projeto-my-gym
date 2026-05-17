var treinoSerieModel = require("../models/treinoSerieModel")

function cadastrarSerie(req, res) {
    var set_order = req.body.setOrderServer
    var id_training_log = req.body.idTrainingLogServer
    var rep = req.body.repServer
    var weight = req.body.weightServer

    // Faça as validações dos valores
    if (set_order == undefined) {
        res.status(400).send("set_order está undefined");
    } else if (id_training_log == undefined) {
        res.status(400).send("id_training_log está undefined");
    } else if (weight == undefined) {
        res.status(400).send("weight está undefined")
    } else if (rep == undefined) {
        res.status(400).send("rep está undefined")
    } else {
        treinoSerieModel.cadastrarSerie(set_order, id_training_log, rep, weight)
            .then(function (resultadoCadastro) {
                res.status(200).json(resultadoCadastro)
            })
            .catch((erro) => {
                console.log(erro)
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function cadastrarLog(req, res) {
    var id_training_exercise = req.body.idTrainingExerciseServer

    // Faça as validações dos valores
    if (id_training_exercise == undefined) {
        res.status(400).send("set_order está undefined");
    } else {
        treinoSerieModel.cadastrarLog(id_training_exercise)
            .then(function (resultadoCadastro) {
                res.status(200).json(resultadoCadastro)
            })
            .catch((erro) => {
                console.log(erro)
                res.status(500).json(erro.sqlMessage);
            })
    }

}

module.exports = {
    cadastrarSerie,
    cadastrarLog
}