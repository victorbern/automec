const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM veiculo', (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarPorPlaca: (placa) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM veiculo WHERE veiculo.placaVeiculo = ?', [placa], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirVeiculo: (placaVeiculo, marca, modelo, ano, 
        capacidadeOleo, cor, veiculo_idCliente) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO Veiculo (placaVeiculo, marca, modelo, ano,
                capacidadeOleo, cor, Veiculo.idCliente) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [placaVeiculo, marca, modelo, ano, capacidadeOleo, cor, veiculo_idCliente],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },

    alterarVeiculo: (placaVeiculo, marca, modelo, ano, 
        capacidadeOleo, cor, veiculo_idCliente) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`UPDATE veiculo SET marca = ?, modelo = ?, ano = ?, capacidadeOleo = ?,
            cor = ?, veiculo.idCliente = ? WHERE veiculo.placaVeiculo = ?`, [marca, modelo, ano, capacidadeOleo, cor, 
            veiculo_idCliente, placaVeiculo], (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarPorCliente: (veiculo_idCliente) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM Veiculo WHERE Veiculo.idCliente = ?', [veiculo_idCliente], (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },
};