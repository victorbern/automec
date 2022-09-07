const { json } = require("body-parser");
const ClienteService = require("../services/ClienteService");
const OrdemServicoService = require("../services/OrdemServicoService");
const qs = require("qs");
const ProdutoService = require("../services/ProdutoService");

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {error: '', result: []};
        let ordens = await OrdemServicoService.buscarTodos();

        for (let i in ordens){
            json.result.push({
                idOrdemServico: ordens[i].idOrdemServico,
                dataOrdemServico: ordens[i].dataOrdemServico,
                total: ordens[i].total,
                km: ordens[i].km,
                isFinalizada: ordens[i].isFinalizada,
                isPaga: ordens[i].isPaga,
                os_idCliente: ordens[i].idCliente
            });
        }
        
        res.json(json);
    },

    buscarPorId: async(req, res) => {
        let json = {error: '', result: {}};
        let idOrdemServico = req.params.id;
        let ordem = await OrdemServicoService.buscarPorId(idOrdemServico);

        if(ordem){
            json.result = ordem;
        }

        res.json(json);
    },

    inserirOrdemServico: async(req, res) => {
        let json = {error: '', result: ''};
        
        let valores = req.body;
        valores = qs.parse(valores);
        
        let idCliente = valores.idCliente;
        let placaVeiculo = valores.placaVeiculo;
        let total = valores.total;
        let km = valores.km
        if(idCliente && placaVeiculo){
            let idOrdemServico = await OrdemServicoService.inserirOrdemServico(idCliente, placaVeiculo, total, km);
            if (idOrdemServico){
                let idOSDetalhes = await OrdemServicoService.inserirOSDetalhes(idOrdemServico);
                if (valores.produtos) {
                    for (let i in valores.produtos){
                        let idProduto = valores.produtos[i].idProduto*1;
                        let quantidade = valores.produtos[i].quantidade*1;
                        
                        await OrdemServicoService.inserirProdutoHasOSDetalhes(idProduto, idOSDetalhes);
                        await ProdutoService.alterarEstoque(quantidade*-1);
                    }
                }
                if (valores.servicos) {
                    for (let i in valores.servicos){
                        let idServico = valores.servicos[i].idServico;
                        let idFuncionario = valores.servicos[i].idFuncionario;
                        let observacao = valores.servicos[i].observacao;
                        await OrdemServicoService.inserirExecutaFuncao(idServico, idFuncionario, observacao, idOSDetalhes);
                    }
                }
            }
            json.result = "Dados enviados";
        } else {
            json.error = "Campos não enviados";
        }
        res.json(json);
    },

    alterarOrdemServico: async(req, res) => {
        let json = {error: '', result: {}};

        let idOrdemServico = req.params.id;
        let dataOrdemServico = req.body.dataOrdemServico;
        let total = req.body.total;
        let km = req.body.km;
        let isFinalizada = req.body.isFinalizada;
        let isPaga = req.body.isPaga;
        let os_idCliente = req.body.os_idCliente;

        if(dataOrdemServico && total && os_idCliente){
            await OrdemServicoService.alterarOrdemServico(idOrdemServico, dataOrdemServico, total, km, isFinalizada,
                isPaga, os_idCliente);
            json.result = {
                idOrdemServico, 
                dataOrdemServico, 
                total, 
                km, 
                isFinalizada,
                isPaga, 
                os_idCliente
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.js;
    }

}
