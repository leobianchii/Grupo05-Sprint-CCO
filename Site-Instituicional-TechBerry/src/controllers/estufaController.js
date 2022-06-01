var estufaModel = require("../models/estufaModel");

function estufa(req, res){
    var idUsuario = req.params.idUsuario;

    estufaModel.listarEstufa(idUsuario).then(
        function(resultado){
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            }else{
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao achar as estufas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }); 
}

module.exports = {
    estufa
}