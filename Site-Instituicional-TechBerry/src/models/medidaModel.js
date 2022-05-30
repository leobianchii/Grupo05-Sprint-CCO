var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
    instrucaoSql = `SELECT MAX(temperaturaLida) AS max_temp, MIN(temperaturaLida) AS min_temp, DATE_FORMAT(momento,'%e/%m') AS momento_grafico FROM Historico
	WHERE fkEstufa = ${idAquario}
    GROUP BY  dayofmonth(momento)
    ORDER BY momento limit ${limite_linhas};`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasHora(idAquario, limite_linhas) {
    instrucaoSql = `SELECT temperaturaLida as temperatura, momento, DATE_FORMAT(momento,'%H:%i:%s') AS momento_grafico FROM historico
	WHERE fkEstufa = ${idAquario}
    ORDER BY idHistorico DESC limit ${limite_linhas};`;

    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
    instrucaoSql = `SELECT temperaturaLida as temperatura, momento, DATE_FORMAT(momento,'%H:%i:%s') AS momento_grafico FROM historico
	WHERE fkEstufa = ${idAquario}
    ORDER BY idHistorico DESC limit 4;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoDia(idAquario) {
    instrucaoSql = `SELECT MAX(temperaturaLida) AS max_temp, MIN(temperaturaLida) AS min_temp, DATE_FORMAT(momento,'%e/%m') AS momento_grafico FROM Historico
	WHERE fkEstufa = ${idAquario}
    GROUP BY  dayofmonth(momento)
    ORDER BY momento limit 7;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarUltimasMedidasHora,
    buscarMedidasEmTempoDia
}