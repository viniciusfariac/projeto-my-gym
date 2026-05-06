var express = require("express");
var router = express.Router();

var muscleController = require("../controllers/muscleGroupController");


router.get("/listar", function (req, res) {
  muscleController.searchGroup(req, res);
});


module.exports = router;