const { json } = require("body-parser");
const AppError = require("../errors/AppError");
const RelatorioService = require("../services/RelatorioService");
var sd = require("silly-datetime");

module.exports = {
    buscarPagamentos: async (req, res) => {
        let json = { error: "", result: { total: null, tipos: [] } };

        let dataDe = req.body.dataDe;
        let dataAte = req.body.dataAte;

        if (!dataDe) {
            throw new AppError("O campo data inicio não pode ser nulo", 400);
        }

        if (!dataAte) {
            throw new AppError("O campo data final não pode ser nulo", 400);
        }

        let pagamentos = await RelatorioService.buscarPagamentos(
            dataDe,
            dataAte
        ).catch((error) => {
            throw new AppError(error, 500);
        });

        // Soma todos os totais de pagamento
        let total = 0;
        pagamentos.forEach(
            (pagamento, index, array) => (total += pagamento.total)
        );

        // Cria um array tipo que armazena todos os tipos presentes nestes pagamentos
        let tipo = [];
        for (let i in pagamentos) {
            let existe = false;
            for (let j in tipo) {
                if (tipo[j] === pagamentos[i].formaPagamento) {
                    existe = true;
                }
            }
            if (!existe) {
                tipo.push(pagamentos[i].formaPagamento);
            }
        }

        // Armazena os dados dos pagamentos separando por tipo
        let dados = [];
        for (let i in tipo) {
            let dado = pagamentos.filter(
                (pagamento, index, array) =>
                    pagamento.formaPagamento === tipo[i]
            );
            dados.push(dado);
        }

        // Soma do total por tipo
        let totalTipo = [];
        for (let i in dados) {
            let soma = 0;
            dados[i].forEach(
                (pagamento, index, array) => (soma += pagamento.total)
            );
            totalTipo[i] = soma;
        }

        // Monta o array com os pagamentos já separados
        json.result.total = total;
        for (let i in tipo) {
            json.result.tipos.push({
                tipo: tipo[i],
                total: totalTipo[i],
                pagamentos: dados[i],
            });
        }

        res.json(json);
    },
};
