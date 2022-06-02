var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
    instrucaoSql = `SELECT MAX(temperaturaLida) AS max_temp, MIN(temperaturaLida) AS min_temp, MAX(umidadeLida) AS max_umi, MIN(umidadeLida) AS min_umi, DATE_FORMAT(momento,'%e/%m') AS momento_grafico FROM Historico
	WHERE fkEstufa = ${idAquario}
    GROUP BY  dayofmonth(momento)
    ORDER BY momento limit ${limite_linhas};`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasHora(idAquario, limite_linhas) {
    instrucaoSql = `SELECT temperaturaLida AS temperatura, umidadeLida AS umidade, DATE_FORMAT(momento,'%H:%i:%s') AS momento_grafico FROM historico
	WHERE fkEstufa = ${idAquario}
    AND day(momento) = day(now()) 
    ORDER BY idHistorico DESC limit ${limite_linhas};`;

    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
    instrucaoSql = `SELECT temperaturaLida AS temperatura, umidadeLida AS umidade, DATE_FORMAT(momento,'%H:%i:%s') AS momento_grafico FROM historico
	WHERE fkEstufa = ${idAquario}
    AND day(momento) = day(now()) 
    ORDER BY idHistorico DESC limit 7;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoDia(idAquario) {
    instrucaoSql = `SELECT MAX(temperaturaLida) AS max_temp, MIN(temperaturaLida) AS min_temp, MAX(umidadeLida) AS max_umi, MIN(umidadeLida) AS min_umi,DATE_FORMAT(momento,'%e/%m') AS momento_grafico FROM Historico
	WHERE fkEstufa = ${idAquario}
    GROUP BY  dayofmonth(momento)
    ORDER BY momento limit 7;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertas(idAquario){
    instrucao = `SELECT COUNT(DISTINCT hour(momento)) AS alerta FROM Historico
	WHERE ((temperaturaLida >= (SELECT temperaturaMax FROM Morango WHERE idMorango = 1)
    OR temperaturaLida <= (SELECT temperaturaMin FROM Morango WHERE idMorango = 1))
    OR (umidadeLida >= (SELECT umidadeMax FROM Morango WHERE idMorango = 1) OR
    umidadeLida <= (SELECT umidadeMin FROM Morango WHERE idMorango = 1)))
    AND day(momento) = day(now())
    AND fkEstufa = ${idAquario};`;

    return database.executar(instrucao);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarUltimasMedidasHora,
    buscarMedidasEmTempoDia,
    buscarAlertas
}