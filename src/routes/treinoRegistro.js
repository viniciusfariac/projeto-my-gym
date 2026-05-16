var express = require("express");
var router = express.Router();

var treinoRegistroController = require("../controllers/treinoRegistroController");
const { route } = require(".");


router.get("/peso-total/:idUser/:date", function (req, res) {
    treinoRegistroController.pesoTotalNoMes(req, res);
});

router.get("/dia-ido/:idUser", function (req, res) {
    treinoRegistroController.diaComparecido(req, res)
})

router.get("/comparacao-treino/:idTrainingExercise", function (req, res) {
    treinoRegistroController.comparacaoDeTreinos(req, res)  
})

router.get("/maximo-carga/:idTrainingExercise", function (req, res) {
    treinoRegistroController.pesoTotalNoExercicio(req, res)    
})

router.get("/comparacao-semana/:idUser", function (req, res) {
    treinoRegistroController.comparacaoEntreSemanas(req, res)
})

router.get("/frequencia-semana/:idUser", function (req, res) {
    treinoRegistroController.frequenciaSemana(req, res)    
})
module.exports = router;