var express = require("express");
var router = express.Router();

var exerciseController = require("../controllers/exerciseController");

router.get("/buscar/:muscleid", function (req, res) {
  exerciseController.searchWithMuscle(req, res)
})

router.get("/listar", function (req, res) {
  exerciseController.listar(req, res)
})


module.exports = router;