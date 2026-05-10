var express = require("express");
var router = express.Router();

var treinoController = require("../controllers/treinoController");
const { route } = require(".");


router.get("/:empresaId", function (req, res) {
  treinoController.buscarTreinoPorUsuario(req, res);
});

router.post("/cadastrar", function (req, res) {
  treinoController.cadastrarTreino(req, res);
})

router.get("/frequencia-mes/:idUser", function (req, res) {
  treinoController.frequenciaNoMes(req, res)
})

router.get("/frequencia-horario/:idUser", function (req, res) {
  treinoController.horarioFrequente(req, res)
})

router.get("/frequencia-meta/:idUser", function (req, res) {
  treinoController.metaMensal(req, res)
})

router.get("/listar/:idUser", function (req, res) {
  treinoController.buscarTreinoPorUsuario(req, res)
})

module.exports = router;