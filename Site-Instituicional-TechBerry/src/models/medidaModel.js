var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
    instrucaoSql = `SELECT TOP ${limite_linhas} MAX(temperaturaLida) AS 'max_temp', MIN(temperaturaLida) AS 'min_temp', MAX(umidadeLida) AS 'max_umi', MIN(umidadeLida) AS 'min_umi', CONVERT(varchar, momento, 107) AS 'momento_grafico', DAY(momento) FROM Historico
	WHERE fkEstufa = ${idAquario}
	AND DAY(CURRENT_TIMESTAMP) >= DAY(momento)
    GROUP BY DAY(momento), CONVERT(varchar, momento, 107)
    ORDER BY DAY(momento) DESC;`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasHora(idAquario, limite_linhas) {
    instrucaoSql = `SELECT TOP ${limite_linhas} temperaturaLida AS 'temperatura', umidadeLida AS 'umidade', CONVERT(VARCHAR, momento, 108) AS momento_grafico FROM historico
	WHERE fkEstufa = ${idAquario}
    AND day(momento) = day(GETDATE()) 
    ORDER BY idHistorico DESC;`;

    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
    instrucaoSql = `SELECT TOP 7 temperaturaLida AS 'temperatura', umidadeLida AS 'umidade', CONVERT(VARCHAR, momento, 108) AS momento_grafico FROM historico
	WHERE fkEstufa = ${idAquario}
    AND day(momento) = day(GETDATE()) 
    ORDER BY idHistorico DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoDia(idAquario) {
    instrucaoSql = `SELECT TOP ${limite_linhas} MAX(temperaturaLida) AS 'max_temp', MIN(temperaturaLida) AS 'min_temp', MAX(umidadeLida) AS 'max_umi', MIN(umidadeLida) AS 'min_umi', CONVERT(varchar, momento, 107) AS 'momento_grafico', DAY(momento) FROM Historico
	WHERE fkEstufa = ${idAquario}
	AND DAY(CURRENT_TIMESTAMP) >= DAY(momento)
    GROUP BY DAY(momento), CONVERT(varchar, momento, 107)
    ORDER BY DAY(momento) DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertas(idAquario){
    instrucao = `SELECT COUNT(DISTINCT DATEPART(HOUR, momento)) AS alerta FROM Historico
	WHERE ((temperaturaLida >= (SELECT temperaturaMax FROM Morango WHERE idMorango = 1)
    OR temperaturaLida <= (SELECT temperaturaMin FROM Morango WHERE idMorango = 1))
    OR (umidadeLida >= (SELECT umidadeMax FROM Morango WHERE idMorango = 1) OR
    umidadeLida <= (SELECT umidadeMin FROM Morango WHERE idMorango = 1)))
    AND DAY(momento) = DAY(GETDATE())
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