CREATE DATABASE automec_v1;

USE automec_v1;

CREATE TABLE cliente(
	idCliente INT NOT NULL AUTO_INCREMENT,
    nomeCliente VARCHAR(60),
    cpfCnpj VARCHAR(14),
    celularCliente VARCHAR(20),
    cep VARCHAR(14),
    endereco VARCHAR(60),
    numero VARCHAR(6),
    cidade VARCHAR(60),
    uf VARCHAR(2),
    complemento VARCHAR(60),
    PRIMARY KEY (idCliente)
)engine innodb;

CREATE TABLE funcionario(
	idFuncionario INT NOT NULL AUTO_INCREMENT,
    nomeFuncionario VARCHAR(60),
    isAtivo BOOLEAN,
    funcao VARCHAR(45),
	PRIMARY KEY (idFuncionario)
)engine innodb;
insert into funcionario (nomeFuncionario, isAtivo, funcao) values ("André", true, "Mecânico");
CREATE TABLE produto(
	idProduto INT NOT NULL AUTO_INCREMENT,
    codigoBarras VARCHAR(45),
    descricao VARCHAR(45),
    valorCusto FLOAT,
    quantidade INT,
    precoVenda FLOAT,
    PRIMARY KEY (idProduto)
)engine innodb;
insert into produto (codigoBarras, descricao, valorCusto, quantidade, precoVenda) values ("213213213", "Oleo X", 12.3, 43, 14.5);
CREATE TABLE servico(
	idServico INT NOT NULL AUTO_INCREMENT,
    descricaoServico VARCHAR(60),
    precoServico VARCHAR(45),
    PRIMARY KEY (idServico)
)engine innodb;

CREATE TABLE veiculo (
	placaVeiculo VARCHAR(8),
    marca VARCHAR(45),
    modelo VARCHAR(45),
    ano INT,
    capacidadeOleo DOUBLE,
    cor VARCHAR(45),
    idCliente INT,
    PRIMARY KEY (placaVeiculo),
    FOREIGN KEY (idCliente) REFERENCES cliente (idCliente)
)engine innodb;

insert into veiculo values ("KKL3424", "Fiat", "Uno", 2004, 12.2, "Preto", 1);

CREATE TABLE OrdemServico (
	idOrdemServico INT NOT NULL AUTO_INCREMENT,
    dataOrdemServico DATE,
    total FLOAT,
    km INT,
    isFinalizada BOOLEAN,
    isPaga BOOLEAN,
    idCliente INT,
    PRIMARY KEY (idOrdemServico),
    FOREIGN KEY (idCliente) REFERENCES cliente (idCliente)
)engine innodb;

CREATE TABLE pagamento (
	idPagamento INT NOT NULL AUTO_INCREMENT,
    dataHora DATETIME,
    subtotal FLOAT,
    total FLOAT,
    desconto FLOAT, 
    formaPagamento VARCHAR(45),
    OS_idOrdemServico INT,
    PRIMARY KEY (idPagamento),
    FOREIGN KEY (OS_idOrdemServico) REFERENCES OrdemServico (idOrdemServico)
)engine innodb;

CREATE TABLE ExecutaFuncao(
	OS_idOrdemServico INT,
    Funcionario_idFuncionario INT,
    Servico_idServico INT,
    observacao VARCHAR(45),
    PRIMARY KEY (OS_idOrdemServico, Funcionario_idFuncionario, Servico_idServico),
    FOREIGN KEY (OS_idOrdemServico) REFERENCES OrdemServico (idOrdemServico),
    FOREIGN KEY (Funcionario_idFuncionario) REFERENCES Funcionario (idFuncionario),
    FOREIGN KEY (Servico_idServico) REFERENCES Servico (idServico)
)engine innodb;

CREATE TABLE VendaDireta (
	Produto_idProduto INT,
    Pagamento_idPagamento INT,
    PRIMARY KEY (Produto_idProduto, Pagamento_idPagamento),
    FOREIGN KEY (Produto_idProduto) REFERENCES Produto (idProduto),
    FOREIGN KEY (Pagamento_idPagamento) REFERENCES Pagamento (idPagamento)
)engine innodb;

CREATE TABLE Produto_has_OrdemServico (
	Produto_idProduto INT,
    OS_idOrdemServico INT,
    PRIMARY KEY (Produto_idProduto, OS_idOrdemServico),
    FOREIGN KEY (Produto_idProduto) REFERENCES produto (idProduto),
    FOREIGN KEY (OS_idOrdemServico) REFERENCES OrdemServico (idOrdemServico)
)engine innodb;