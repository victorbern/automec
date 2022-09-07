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

    inserirProdutoHasOSDetalhes: (idProduto, idOSDetalhes) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO Produto_has_OSDetalhes (idProduto, idOSDetalhes) VALUES (?, ?)`, 
                [idProduto, idOSDetalhes],
            (error, results) => {
                if(error) {rejeitado(error); return; }
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
    }
};