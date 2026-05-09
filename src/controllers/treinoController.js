var usuarioModel = require("../models/usuarioModel");
var treinoModel = require("../models/treinoModel");

function cadastrarTreino(req, res) {
    var nome = req.body.nomeServer
    var type = req.body.typeServer
    var day = req.body.dayServer
    var id_usuario = req.body.idServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome do treino está undefined!");
    } else if (type == undefined) {
        res.status(400).send("O tipo do treino está undefined");
    } else if (day == undefined) {
        res.status(400).send("O dia está undefined");
    } else if (id_usuario == undefined) {
        res.status(400).send("O id do usuário está undefined")
    } else {
        treinoModel.cadastrarTreino(id_usuario, nome, day, type)
            .then(function (resultadoCadastro) {
                res.status(200).json({
                    insertId: resultadoCadastro.insertId,
                    resultado: true
                })
            })
            .catch((erro) => {
                console.log(erro)
                res.status(500).json(erro.sqlMessage);
            })
    }

}

function frequenciaNoMes(req, res) {
    var id_user = req.params.idUser

    if (id_user == undefined) {
        res.status(400).send("O id do usuário está undefined");
    } else {
        treinoModel.frequenciaNoMes(id_user)
            .then(function (resultado) {
                res.status(200).json(resultado)
            })
            .catch((erro) => {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            })
    }
}

function horarioFrequente(req, res) {
    var id_user = req.params.idUser


    if (id_user == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else {
        treinoModel.horarioFrequente(id_user)
            .then(function (resultado) {
                res.status(200).json(resultado)
            })
            .catch((erro) => {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            })
    }
}

function metaMensal(req, res) {
    var id_user = req.params.idUser

    if (id_user == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else {
        treinoModel.metaMensal(id_user)
            .then(function (resultado) {
                res.status(200).json(resultado)
            })
            .catch((erro) => {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            })
    }
}


module.exports = {
    cadastrarTreino,
    frequenciaNoMes,
    horarioFrequente,
    metaMensal
}