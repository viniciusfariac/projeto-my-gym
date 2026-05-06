var treinoModel = require("../models/muscleGroupModel");

function searchGroup(req, res) {
    console.log(treinoModel.searchGroup)

    treinoModel.searchGroup()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a listagem ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    searchGroup
}