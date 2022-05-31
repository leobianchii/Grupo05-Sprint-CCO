var express = require("express");
var router = express.Router();

var estufaController = require("../controllers/estufaController");

router.get("/estufas/:idUsuario", function(req, res) {
    estufaController.estufa(req, res);
})

module.exports = router;