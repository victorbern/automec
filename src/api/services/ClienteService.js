const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT idCliente, nomeCliente, cpfCnpj, celularCliente, cep, endereco, numero,' +
            'cidade, uf, complemento FROM Cliente`, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    // Buscar todos com limite de dados
    buscarTodos: (inicio, qtdClientes) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT idCliente, nomeCliente, cpfCnpj, celularCliente, cep, endereco, numero,' +
            'cidade, uf, complemento FROM Cliente LIMIT ?, ?`, [inicio, qtdClientes], (error, results) => {
                if (error) { rejeitado(error); return; }
                results.push()
                aceito(results);
            });
        });
    },

    buscarTotalClientes: () => {
        return new Promise((aceito, recusado) => {
            db.query(`SELECT COUNT(idCliente) AS totalClientes FROM Cliente`, (error, results) => {
                if(error) { rejeitado(error); return; }
                aceito(results[0].totalClientes);
            });
        });
    },

    buscarTotalClientesPorValor: (valor) => {
        valor = "%"+valor+"%";
        return new Promise((aceito, recusado) => {
            db.query(`SELECT COUNT(idCliente) AS totalClientes FROM Cliente WHERE nomeCliente like ? OR cpfCnpj like ?`, [valor, valor], (error, results) => {
                if(error) { rejeitado(error); return; }
                aceito(results[0].totalClientes);
            });
        });
    },

    buscarPorId: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT idCliente, nomeCliente, cpfCnpj, celularCliente, cep, endereco, numero,' +
            'cidade, uf, complemento FROM Cliente WHERE Cliente.idCliente = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscaPorValor: (valor, inicio, qtdClientes) => {
        valor = "%"+valor+"%";
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT idCliente, nomeCliente, cpfCnpj, celularCliente, cep, endereco, numero,' +
            'cidade, uf, complemento FROM Cliente WHERE nomeCliente like ? OR cpfCnpj like ? LIMIT ?, ?', [valor, valor, inicio, qtdClientes], 
            (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirCliente: (nomeCliente, cpfCnpj, celularCliente, cep,
        endereco, numero, cidade, uf, complemento) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO Cliente (nomeCliente, cpfCnpj, celularCliente, cep,` +
                `endereco, numero, cidade, uf, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [nomeCliente, cpfCnpj, celularCliente, cep, endereco, numero, cidade, uf, complemento],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results.insertId);
                });
        });
    },

    alterarCliente: (id, nomeCliente, cpfCnpj, celularCliente, cep,
        endereco, numero, cidade, uf, complemento) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE Cliente SET nomeCliente = ?, cpfCnpj = ?, celularCliente = ?,' +
                'cep = ?, endereco = ?, numero = ?, cidade = ?, uf = ?, complemento = ? WHERE idCliente = ?',
                [nomeCliente, cpfCnpj, celularCliente, cep, endereco, numero, cidade, uf,
                    complemento, id], (error, results) => {
                        if (error) { rejeitado(error); return; }
                        aceito(results);
                    });
        });
    },

    excluirCliente: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM Cliente WHERE idCliente = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
};

// Alterações feitas no dia 27/08/2022
// Adição de método remover (que apenas altera o valor isAtivo no banco de dados)
// Mudança nas funções buscarTodos e buscarClientePorId (que buscam apenas clientes ativos)
// Implementação do método de busca inteligente