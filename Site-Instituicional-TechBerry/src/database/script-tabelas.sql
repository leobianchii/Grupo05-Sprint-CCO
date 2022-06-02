-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE TechBerry;
USE TechBerry;


CREATE TABLE cliente (
	idCliente INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	empresa VARCHAR(50),
    cnpj CHAR(14),
    uf CHAR(2)
);

INSERT INTO cliente
	VALUES(NULL, 'Pedro', 'pedro.varela@sptech.school', 'pedro1234', 'Techberry', '67177207000107', 'SP')
    ,(NULL, 'Vitoria', 'vick@gmail.com', 'vick1234', 'Greentech', '40453217000171', 'RJ');

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (45),
    email VARCHAR(45),
    senha VARCHAR(20),
    fkCliente INT,
    FOREIGN KEY (fkCliente) REFERENCES Cliente(idCliente)
);

INSERT INTO Usuario
	VALUES(NULL, 'Funcionario 1', 'funcionario@gmail.com', 'func1234', 1)
    ,(NULL, 'Funcionario 2', 'funcionario2@gmail.com', 'func1234', 2)
    ,(NULL, 'Funcionario 3', 'funcionario3@gmail.com', 'func1234', 1);

CREATE TABLE Fazenda(
	idFazenda INT PRIMARY KEY AUTO_INCREMENT,
    bairro VARCHAR(45),
    logradouro VARCHAR(45),
    cep CHAR(8),
    numero CHAR(5),
    UF CHAR(2),
    fkClienteFazenda INT,
    FOREIGN KEY (fkClienteFazenda) REFERENCES Cliente(idCliente)
);

INSERT INTO Fazenda
	VALUES(NULL, 'Vila Nova Teresa', 'Rua Frei Jorge Cotrim', '03823050', '616', 'SP', 1)
    ,(NULL, 'Aliança', 'Rua Galo da Serra', '06236740', '183', 'SP', 2);

CREATE TABLE Estufa(
	idEstufa INT PRIMARY KEY AUTO_INCREMENT,
    descEstufa VARCHAR(45),
    fkFazenda INT,
    FOREIGN KEY (fkFazenda) REFERENCES Fazenda(idFazenda)
);


INSERT INTO Estufa
	VALUES(NULL, 'Estufa 1', 1)
    ,(NULL, 'Estufa 2', 1)
    ,(NULL, 'Estufa 1', 2);

CREATE TABLE Historico(
	idHistorico INT PRIMARY KEY AUTO_INCREMENT,
    descHistorico VARCHAR(45),
    temperaturaLida DECIMAL(5,2),
    umidadeLida DECIMAL(5,2),
    momento DATETIME,
    fkEstufa INT,
    FOREIGN KEY (fkEstufa) REFERENCES Estufa(idEstufa)
);

INSERT INTO Historico
	VALUES(null, 'Temperaturas lidas', 28, 75, now(), 1)
    ,(null, 'Temperaturas lidas', 32, 60, now(), 1)
    ,(null, 'Temperaturas lidas', 24, 80, now(), 1)
    ,(null, 'Temperaturas lidas', 23, 85, now(), 1)
    ,(null, 'Temperaturas lidas', 21, 82, now(), 1)
    ,(null, 'Temperaturas lidas', 19, 83, now(), 1)
    ,(null, 'Temperaturas lidas', 18, 90, now(), 1)
    ,(null, 'Temperaturas lidas', 13, 85, '2022-06-01 12:00:00', 1)
    ,(null, 'Temperaturas lidas', 25, 70, '2022-06-01 11:00:00', 1)
    ,(null, 'Temperaturas lidas', 32, 55, '2022-06-01 10:00:00', 1)
    ,(null, 'Temperaturas lidas', 30, 75, '2022-05-31 12:00:00', 1)
    ,(null, 'Temperaturas lidas', 22, 75, '2022-05-31 11:00:00', 1)
    ,(null, 'Temperaturas lidas', 12, 75, '2022-05-31 10:00:00', 1);
    
SELECT COUNT(temperaturaLida) FROM Historico
	INNER JOIN Estufa ON Historico.fkEstufa = Estufa.idEstufa
    INNER JOIN MorangoEstufa ON Estufa.idEstufa = MorangoEstufa.fkEstufa
    INNER JOIN Morango ON MorangoEstufa.fkMorango = Morango.idMorango
    WHERE (temperaturaLida > temperaturaMax OR temperaturaLida < temperaturaMin)
    AND Historico.fkEstufa = 1;
        
CREATE TABLE Morango(
	idMorango INT PRIMARY KEY AUTO_INCREMENT,
    tipoMorango VARCHAR(45),
    valor DECIMAL(5,2),
    temperaturaMax DECIMAL(5,2),
    temperaturaMin DECIMAL(5,2),
    umidadeMax DECIMAL(5,2),
    umidadeMin DECIMAL(5,2)
);

INSERT INTO Morango
	VALUES(NULL, 'Morango Silvestre', 3.00, '23', '16', '75', '55')
    ,(NULL, 'Morango Ucraniano', 3.00, '30', '10', '75', '55');

CREATE TABLE MorangoEstufa(
	fkMorango INT,
    FOREIGN KEY (fkMorango) REFERENCES Morango(idMorango),
    fkEstufa INT,
    FOREIGN KEY (fkEstufa) REFERENCES Estufa(idEstufa),
    PRIMARY KEY(fkMorango, fkEstufa)
);

INSERT INTO MorangoEstufa
	VALUES(1, 1)
    ,(1, 2)
    ,(2, 1);


/* para sql server - remoto - produção */

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DECIMAL,
	umidade DECIMAL,
	momento DATETIME,
	fk_aquario INT
);


