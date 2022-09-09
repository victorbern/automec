const { json } = require("body-parser");
const ClienteService = require("../services/ClienteService");
const OrdemServicoService = require("../services/OrdemServicoService");
const qs = require("qs");
const ProdutoService = require("../services/ProdutoService");
const VeiculoService = require("../services/VeiculoService");

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {error: '', result: []};
        let ordens = await OrdemServicoService.buscarTodos();

        if (ordens) {
            for (let i in ordens) {
                let cliente = await ClienteService.buscarPorId(ordens[i].idCliente);
                let veiculo = await VeiculoService.buscarPorPlaca(ordens[i].placaVeiculo);
                let osDetalhes = await OrdemServicoService.buscarOSDetalhes(ordens[i].idOrdemServico);
                let vendas = await OrdemServicoService.buscarProdutoOSDetalhes(osDetalhes.idOSDetalhes);
                let produtos = []
                if (vendas) {
                    for (let i in vendas) {
                        let produto = await ProdutoService.buscarPorId(vendas[i].idProduto);
                        let quantidadeVendida = vendas[i].quantidade;
                        let precoUnitario = vendas[i].precoUnitario;
                        let precoTotal = precoUnitario*quantidade;
                        produtos.push({idProduto: vendas[i].idProduto, codigoBarras: produto.codigoBarras, descricao: produto.descricao, quantidadeVendida: quantidadeVendida, precoTotal: precoTotal});
                    }
                }
                let executaFuncao = await OrdemServicoService.buscarExecutaFuncao();
                let servicos = []
                if (executaFuncao) {
                    for (let i in executaFuncao) {
                        // let servico = await ServicoService.buscarPorId(executaFuncao[i].idServico);
                        let funcionario = await FuncionarioService.buscarPorId(executaFuncao[i].idFuncionario);
                        servicos.push({idServico: executaFuncao[i].idServico, descricaoServico: servicos.descricaoServico, precoServico: servico.precoServico, observacao: executaFuncao.observacao, idFuncionario: funcionario.idFuncionario, nomeFuncionario: funcionario.nomeFuncionario});
                    }
                }
                json.result.push({
                    idOrdemServico: ordens[i].idOrdemServico,
                    total: ordens[i].total,
                    km: ordens[i].total,
                    isFinalizada: ordens[i].isFinalizada,
                    isPaga: ordens[i].isPaga,
                    cliente: cliente,
                    veiculo: veiculo,
                    data: osDetalhes.data,
                    produtos: produtos,
                    servicos: servicos
                })
            }
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
                        let quantidade = valores.produtos[i].quantidade*-1;
                        let precoUnitario = valores.produtos[i].precoUnitario*1;
                        await OrdemServicoService.inserirProdutoHasOSDetalhes(idProduto, idOSDetalhes, quantidade, precoUnitario);
                        await ProdutoService.alterarEstoque(idProduto, quantidade);
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
