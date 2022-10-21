const db = require("../../db");

module.exports = {
    buscarPagamentos: (dataDe, dataAte) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT idPagamento, total, formaPagamento, dataHora FROM Pagamento WHERE dataHora BETWEEN ? AND ?`,
                [dataDe, dataAte],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },
};
