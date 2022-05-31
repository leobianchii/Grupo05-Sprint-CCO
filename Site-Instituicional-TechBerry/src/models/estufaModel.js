var database = require("../database/config");

function listarEstufa(idUsuario) {
    var instrucao = `SELECT COUNT(idEstufa) FROM Estufa
	INNER JOIN Fazenda ON estufa.fkFazenda = fazenda.idFazenda
    INNER JOIN Cliente ON fazenda.fkClienteFazenda = cliente.idCliente
    WHERE idCLiente = ${idUsuario};`;

    return database.executar(instrucao); 
}

module.exports = {
    listarEstufa
};