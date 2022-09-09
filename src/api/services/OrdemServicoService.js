const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM OrdemServico', (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarPorId: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM OrdemServico WHERE OrdemServico.idCliente = ?', [idOrdemServico], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirOrdemServico: (idCliente, placaVeiculo, total, km) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO OrdemServico (idCliente, placaVeiculo, total, km) VALUES (?, ?, ?, ?)`, 
                [idCliente, placaVeiculo, total, km],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },

    alterarOrdemServico: (idOrdemServico, dataOrdemServico, total, km,
        isFinalizada, isPaga, os_idCliente) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE OrdemServico SET dataOrdemServico = ?, total = ?, km = ?,' +
                'isFinalizada = ?, isPaga = ?, OrdemServico.idCliente = ? WHERE idOrdemServico = ?', 
                [dataOrdemServico, total, km, isFinalizada, isPaga, os_idCliente, idOrdemServico], (error, results) => {
                    if(error) {rejeitado(error); return; }
                    aceito(results);
            });
        });
    },

    inserirOSDetalhes: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO OSDetalhes (idOrdemServico) VALUES (?)`, 
                [idOrdemServico],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },

    buscarOSDetalhes: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT idOSDetalhes, data FROM OSDetalhes WHERE idOrdemServico = ?', [idOrdemServico], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirProdutoHasOSDetalhes: (idProduto, idOSDetalhes, quantidade, precoUnitario) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO Produto_has_OSDetalhes (idProduto, idOSDetalhes, quantidade, precoUnitario) VALUES (?, ?, ?, ?)`, 
                [idProduto, idOSDetalhes, quantidade, precoUnitario],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarProdutoOSDetalhes: (idOSDetalhes) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT idProduto, quantidade, precoUnitario FROM Produto_has_OSDetalhes WHERE idOSDetalhes = ?', [idOSDetalhes], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirExecutaFuncao: (idServico, idFuncionario, observacao, idOSDetalhes) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO ExecutaFuncao (idServico, idFuncionario, observacao, idOSDetalhes) VALUES (?, ?, ?, ?)`, 
                [idServico, idFuncionario, observacao, idOSDetalhes],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarExecutaFuncao: (idOSDetalhes) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT idFuncionario, idServico, observacao FROM ExecutaFuncao WHERE idOSDetalhes = ?', [idOSDetalhes], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    }
};