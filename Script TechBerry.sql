create database TechBerry;
use TechBerry;


create table Cliente(
	idCliente int primary key auto_increment,
    nomeCliente varchar(45),
    nomeEmpresa varchar(45),
    cnpjCliente char(14)
);

create table telefone(
	idTelefone int primary key,
    numero CHAR(11),
    fkCliente int,
    foreign key (fkCliente) references Cliente(idCliente)
);

create table Usuario(
	idUsuario int primary key,
    email varchar(45),
    senha varchar(20),
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

drop database Techberry;