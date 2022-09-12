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
            db.query('SELECT * FROM OrdemServico WHERE idOrdemServico = ?', [idOrdemServico], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscaPorIdCliente: (idCliente) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM OrdemServico WHERE idCliente = ?', [idCliente], 
            (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0){
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscaPorPlacaVeiculo: (placaVeiculo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM OrdemServico WHERE placaVeiculo like ?', [placaVeiculo], 
            (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0){
                    aceito(results[0]);
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

    alterarOrdemServico: (idOrdemServico, total, km,
        isFinalizada, isPaga, os_idCliente) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE OrdemServico SET total = ?, km = ?, ' +
                'OrdemServico.idCliente = ? WHERE idOrdemServico = ?', 
                [total, km, os_idCliente, idOrdemServico], (error, results) => {
                    if(error) {rejeitado(error); return; }
                    aceito(results);
            });
        });
    },

    inserirOSDetalhes: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO OSDetalhes (idOrdemServico, dataOS) VALUES (?, CURDATE())`, 
                [idOrdemServico],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },

    buscarOSDetalhes: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT idOSDetalhes, dataOS FROM OSDetalhes WHERE idOrdemServico = ?', [idOrdemServico], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
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

    buscarVendaPorOSDetalhes: (idOSDetalhes) => {
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

    buscarProdutoOSDetalhes: (idOSDetalhes, idProduto) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT quantidade, precoUnitario FROM Produto_has_OSDetalhes WHERE idOSDetalhes = ? && idProduto = ?', [idOSDetalhes, idProduto], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    alterarProdutoOSDetalhes: (idOSDetalhes, idProduto, quantidade, precoUnitario) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE Produto_has_OSDetalhes SET quantidade = ?, precoUnitario = ? ' +
                'WHERE idOSDetalhes = ? && idProduto = ?', 
                [quantidade, precoUnitario, idOSDetalhes, idProduto], (error, results) => {
                    if(error) {rejeitado(error); return; }
                    aceito(results);
            });
        });
    },

    excluirProdutoOSDetalhes: (idOSDetalhes, idProduto) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM Produto_has_OSDetalhes WHERE idOSDetalhes = ? && idProduto = ?', [idOSDetalhes, idProduto], (error, results) => {
                if(error) {rejeitado(error); return;}
                aceito(results);
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