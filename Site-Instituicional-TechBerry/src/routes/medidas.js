var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/ultimas-hora/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidasHora(req, res);
});

router.get("/alerta/:idAquario", function (req, res){
    medidaController.buscarAlertas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/tempo-dia/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoDia(req, res);
})

module.exports = router;