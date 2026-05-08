var express = require("express");
var router = express.Router();

var userExerciseController = require("../controllers/userExerciseController");

// router.get("/ultimas/:idAquario", function (req, res) {
//     userExerciseController.buscarUltimosExercicios(req, res);
// });

// router.get("/tempo-real/:idAquario", function (req, res) {
//     userExerciseController.buscarUsuariosPorExercicio(req, res);
// })

router.post("/cadastrar", function (req, res) {
    userExerciseController.cadastrar(req, res)
})

module.exports = router;