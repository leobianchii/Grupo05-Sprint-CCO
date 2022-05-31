var estufaModel = require("../models/estufaModel");

function estufa(req, res){
    var idUsuario = req.params.idUsuario;

    estufaModel.listarEstufa(idUsuario).then(
            function(resultado){
                if (resultado > 0) {
                    res.status(200).json(resultado);
                }else{
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            } 
        )
}

module.exports = {
    estufa
}