var express = require("express");
var router = express.Router();

var treinoController = require("../controllers/treinoController");


router.get("/:empresaId", function (req, res) {
  treinoController.buscarTreinoPorUsuario(req, res);
});

router.post("/cadastrar", function (req, res) {
  treinoController.cadastrarTreino(req, res);
})

module.exports = router;