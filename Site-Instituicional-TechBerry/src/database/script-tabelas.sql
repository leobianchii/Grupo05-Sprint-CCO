-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
create database TechBerry;
use TechBerry;


CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	empresa VARCHAR(50),
	bairro VARCHAR(50),
	logradouro VARCHAR(50),
	cep char(8),
	numero VARCHAR(5),
	uf char(2),
	telefone char(11)
);

create table telefone(
	idTelefone int primary key,
    numero CHAR(11),
    fkCliente int,
    foreign key (fkCliente) references Cliente(idCliente)
);

create table Usuario(
	idUsuario int primary key,
    nome varchar (45),
    email varchar(45),
    senha varchar(20),
    cnpj char(14),
    empresa varchar(45),
    fkCliente int,
    foreign key (fkCliente) references Cliente(idCliente)
);

create table Endereco(
	idEndereco int primary key,
    bairro varchar(45),
    logradouro varchar(45),
    cep char(8),
    numero char(5),
    UF CHAR(2),
    fkClienteEndereco int,
    foreign key (fkClienteEndereco) references Cliente(idCliente)
);

create table Fazenda(
	idFazenda int primary key,
    bairro varchar(45),
    logradouro varchar(45),
    cep char(8),
    numero char(5),
    UF CHAR(2),
    fkClienteFazenda int,
    foreign key (fkClienteFazenda) references Cliente(idCliente)
);

create table Estufa(
	idEstufa int primary key,
    descEstufa varchar(45),
    tamanhoEstufa char(5),
    fkFazenda int,
    foreign key (fkFazenda) references Fazenda(idFazenda)
);

create table Sensor(
	idSensor int primary key,
    descSensor varchar(45),
    porta int,
    tipoSensor varchar(20),
    fkEstufa int,
    foreign key (fkEstufa) references Estufa(idEstufa)
);

create table Historico(
	idHistorico int primary key,
    descHistorico varchar(45),
    temperaturaLida char(5),
    umidadeLida char(5),
    momento DATETIME,
    fkSensor int,
    foreign key (fkSensor) references Sensor(idSensor)
);

create table Morango(
	idMorango int primary key,
    tipoMorango varchar(45),
    temperaturaIdeal char(5),
    umidadeIdeal char(5),
    Valor decimal(5,2),
    temperaturaMax char(5),
    temperaturaMin char(5),
    umidadeMax char(5),
    umidadeMin char (5)
);

create table MorandoEstufa(
	fkMorango int,
    foreign key (fkMorango) references Morango(idMorango),
    fkEstufa int,
    foreign key (fkEstufa) references Estufa(idEstufa)
);

create table Alerta(
	idAlerta int primary key,
    dataHora datetime,
    fkHistorico int,
    foreign key (fkHistorico) references Historico(idHistorico),
    fkMorango int,
    foreign key (fkMorango) references Morango(idMorango)
);

select * from usuario;


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


