var express = require("express");
var router = express.Router();

var treinoSerieController = require("../controllers/treinoSerieController");

router.post("/cadastrar-serie", function (req, res) { 
    treinoSerieController.cadastrarSerie(req, res)
})

router.post("/cadastrar-log", function (req, res) {
    treinoSerieController.cadastrarLog(req, res)
})

module.exports = router;