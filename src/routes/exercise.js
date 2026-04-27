var express = require("express");
var router = express.Router();

var exerciseController = require("../controllers/exerciseController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    exerciseController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    exerciseController.buscarPorNome(req, res);
});

router.get("/buscar/:id", function (req, res) {
  exerciseController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  exerciseController.listar(req, res);
});

module.exports = router;