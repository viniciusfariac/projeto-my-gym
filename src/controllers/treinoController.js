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
    }

}

module.exports = {
    cadastrarTreino
}