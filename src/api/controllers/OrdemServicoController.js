const { json } = require("body-parser");
const ClienteService = require("../services/ClienteService");
const OrdemServicoService = require("../services/OrdemServicoService");
const qs = require("qs");
const ProdutoService = require("../services/ProdutoService");
const VeiculoService = require("../services/VeiculoService");
const FuncionarioService = require("../services/FuncionarioService");
const ServicoService = require("../services/ServicoService");

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {error: '', result: []};
        let ordens = await OrdemServicoService.buscarTodos();

        if (ordens) {
            for (let i in ordens) {
                let cliente = await ClienteService.buscarPorId(ordens[i].idCliente);
                let veiculo = await VeiculoService.buscarPorPlaca(ordens[i].placaVeiculo);
                let osDetalhes = await OrdemServicoService.buscarOSDetalhes(ordens[i].idOrdemServico);
                let vendas = await OrdemServicoService.buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes);
                let produtos = []
                if (vendas) {                    
                    for (let i in vendas) {
                        let produto = await ProdutoService.buscarPorId(vendas[i].idProduto);
                        let precoUnitario = vendas[i].precoUnitario;
                        let precoTotal = precoUnitario*vendas[i].quantidade;
                        produtos.push({idProduto: vendas[i].idProduto, codigoBarras: produto.codigoBarras, descricao: produto.descricao, quantidadeVendida: vendas[i].quantidade, precoTotal: precoTotal});
                    }
                }
                let executaFuncao = await OrdemServicoService.buscarExecutaFuncao(osDetalhes.idOSDetalhes);
                let servicos = []
                if (executaFuncao) {
                    for (let i in executaFuncao) {
                        let servico = await ServicoService.buscarPorId(executaFuncao[i].idServico);
                        let funcionario = await FuncionarioService.buscarPorId(executaFuncao[i].idFuncionario);
                        servicos.push({idServico: executaFuncao[i].idServico, descricaoServico: servico.descricaoServico, precoServico: servico.precoServico, observacao: executaFuncao.observacao, idFuncionario: funcionario.idFuncionario, nomeFuncionario: funcionario.nomeFuncionario});
                    }
                }
                json.result.push({
                    idOrdemServico: ordens[i].idOrdemServico,
                    total: ordens[i].total,
                    km: ordens[i].total,
                    isFinalizada: ordens[i].isFinalizada,
                    isPaga: ordens[i].isPaga,
                    cliente: cliente[0],
                    veiculo: veiculo[0],
                    data: osDetalhes.dataOS,
                    produtos: produtos,
                    servicos: servicos
                })
            }
        }
        
        res.json(json);
    },

    buscarPorId: async(req, res) => {
        let json = {error: '', result: []};
        let idOrdemServico = req.params.id;

        let ordem = await OrdemServicoService.buscarPorId(idOrdemServico);
        let cliente = await ClienteService.buscarPorId(ordem.idCliente);
        let veiculo = await VeiculoService.buscarPorPlaca(ordem.placaVeiculo);
        let osDetalhes = await OrdemServicoService.buscarOSDetalhes(ordem.idOrdemServico);
        let vendas = await OrdemServicoService.buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes);
        let produtos = []
        if (vendas) {                    
            for (let i in vendas) {
                let produto = await ProdutoService.buscarPorId(vendas[i].idProduto);
                let precoUnitario = vendas[i].precoUnitario;
                let precoTotal = precoUnitario*vendas[i].quantidade;
                produtos.push({idProduto: vendas[i].idProduto, codigoBarras: produto.codigoBarras, descricao: produto.descricao, quantidadeVendida: vendas[i].quantidade, precoTotal: precoTotal});
            }
        }
        let executaFuncao = await OrdemServicoService.buscarExecutaFuncao(osDetalhes.idOSDetalhes);
        let servicos = []
        if (executaFuncao) {
            for (let i in executaFuncao) {
                let servico = await ServicoService.buscarPorId(executaFuncao[i].idServico);
                    let funcionario = await FuncionarioService.buscarPorId(executaFuncao[i].idFuncionario);
                    servicos.push({idServico: executaFuncao[i].idServico, descricaoServico: servico.descricaoServico, precoServico: servico.precoServico, observacao: executaFuncao.observacao, idFuncionario: funcionario.idFuncionario, nomeFuncionario: funcionario.nomeFuncionario});
                }
            }
        json.result.push({
            idOrdemServico: ordem.idOrdemServico,
            total: ordem.total,
            km: ordem.total,
            isFinalizada: ordem.isFinalizada,
            isPaga: ordem.isPaga,
            cliente: cliente[0],
            veiculo: veiculo[0],
            data: osDetalhes.dataOS,
            produtos: produtos,
            servicos: servicos
        })

        res.json(json);
    },

    buscaPorValor: async(req, res) => {
        let json = {error: '', result: []};
        let valor = req.params.valor;
        let clientes = await ClienteService.buscarPorNomeCliente(valor);
        let veiculos = await VeiculoService.buscarPorPlaca(valor);
        let ordens = []
        ordem = await OrdemServicoService.buscarPorId(valor);
        if (ordem) {
            ordens.push(ordem);
        }
        for (let i in clientes) {
            ordem = await OrdemServicoService.buscaPorIdCliente(clientes[i].idCliente);
            if (ordem) {
                ordens.push(ordem);
            }
        }
        for (let i in veiculos) {
            ordens.push(await OrdemServicoService.buscaPorPlacaVeiculo(veiculos[i].placaVeiculo));
            if (ordem) {
                ordens.push(ordem);
            }
        }
        // json = this.adicionarOSJson(json, ordens);
        ordens = ordens.filter(function (a) {
            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null))

        for (let i in ordens) {
            let cliente = await ClienteService.buscarPorId(ordens[i].idCliente);
            let veiculo = await VeiculoService.buscarPorPlaca(ordens[i].placaVeiculo);
            let osDetalhes = await OrdemServicoService.buscarOSDetalhes(ordens[i].idOrdemServico);
            let vendas = await OrdemServicoService.buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes);
            let produtos = []
            if (vendas) {                    
                for (let i in vendas) {
                    let produto = await ProdutoService.buscarPorId(vendas[i].idProduto);
                    let precoUnitario = vendas[i].precoUnitario;
                    let precoTotal = precoUnitario*vendas[i].quantidade;
                    produtos.push({idProduto: vendas[i].idProduto, codigoBarras: produto.codigoBarras, descricao: produto.descricao, quantidadeVendida: vendas[i].quantidade, precoTotal: precoTotal});
                }
            }
            let executaFuncao = await OrdemServicoService.buscarExecutaFuncao(osDetalhes.idOSDetalhes);
            let servicos = []
            if (executaFuncao) {
                for (let i in executaFuncao) {
                    let servico = await ServicoService.buscarPorId(executaFuncao[i].idServico);
                    let funcionario = await FuncionarioService.buscarPorId(executaFuncao[i].idFuncionario);
                    servicos.push({idServico: executaFuncao[i].idServico, descricaoServico: servico.descricaoServico, precoServico: servico.precoServico, observacao: executaFuncao.observacao, idFuncionario: funcionario.idFuncionario, nomeFuncionario: funcionario.nomeFuncionario});
                }
            }
            json.result.push({
                idOrdemServico: ordens[i].idOrdemServico,
                total: ordens[i].total,
                km: ordens[i].total,
                isFinalizada: ordens[i].isFinalizada,
                isPaga: ordens[i].isPaga,
                cliente: cliente[0],
                veiculo: veiculo[0],
                data: osDetalhes.dataOS,
                produtos: produtos,
                servicos: servicos
            })
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
                        let precoUnitario = valores.produtos[i].precoUnitario*1;
                        await OrdemServicoService.inserirProdutoHasOSDetalhes(idProduto, idOSDetalhes, quantidade, precoUnitario);
                        await ProdutoService.alterarEstoque(idProduto, quantidade*-1);
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

        let valores = req.body;
        valores = qs.parse(valores);

        let idOrdemServico = req.params.id;
        let idCliente = valores.idCliente;
        let placaVeiculo = valores.placaVeiculo;
        let km = valores.km;
        let produtos = valores.produtos;
        let servicos = valores.servicos;

        if (idOrdemServico && idCliente && placaVeiculo){
            await OrdemServicoService.alterarOrdemServico(idOrdemServico, idCliente, placaVeiculo, km); // Altera os dados da ordem de serviço
            let osDetalhes = await OrdemServicoService.buscarOSDetalhes(idOrdemServico);

            if(osDetalhes) {
                let vendas = await OrdemServicoService.buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes);
                let produtosCadastrados = []
                if (vendas) {                    
                    for (let i in vendas) {
                        let produto = await ProdutoService.buscarPorId(vendas[i].idProduto);
                        let precoUnitario = vendas[i].precoUnitario;
                        let precoTotal = precoUnitario*vendas[i].quantidade;
                        produtosCadastrados.push({idProduto: vendas[i].idProduto, codigoBarras: produto.codigoBarras, descricao: produto.descricao, quantidadeVendida: vendas[i].quantidade, precoTotal: precoTotal});
                    }

                    if (qs.stringify(produtos) !== qs.stringify(produtosCadastrados)){
                        if (qs.stringify(produtos).length < qs.stringify(produtosCadastrados).length){
                            for (let i in produtosCadastrados) {
                                let produtoExiste = false;
                                for (let j in produtos) {
                                    if (produtosCadastrados[i].idProduto === produtos[j].idProduto){
                                        produtoExiste = true;
                                    }
                                }
                                if (!produtoExiste){
                                    await OrdemServicoService.excluirProdutoOSDetalhes(produtosCadastrados[i].idOSDetalhes, produtosCadastrados[i].idProduto);
                                }
                            }
                        }
                        for (let i in produtos) {
                            let venda = await OrdemServicoService.buscarProdutoOSDetalhes(osDetalhes.idOSDetalhes, produtos[i].idProduto);
                            if (!venda) {
                                await OrdemServicoService.inserirProdutoHasOSDetalhes(produtos[i].idProduto, osDetalhes.idOSDetalhes, produtos[i].quantidade, produtos[i].precoUnitario);
                                break;
                            }
                            if (venda.quantidade !== produtos[i].quantidade || venda.precoUnitario !== produtos[i].precoUnitario){
                                await OrdemServicoService.alterarProdutoOSDetalhes(osDetalhes.idOSDetalhes, produtos[i].idProduto, produtos[i].quantidade, produtos[i].precoUnitario);
                            }
                        }
                    }
                }
                let executaFuncao = await OrdemServicoService.buscarExecutaFuncao(osDetalhes.idOSDetalhes);
                let servicosCadastrados = []

                if (executaFuncao) {
                    for (let i in executaFuncao) {
                        let servico = await ServicoService.buscarPorId(executaFuncao[i].idServico);
                        let funcionario = await FuncionarioService.buscarPorId(executaFuncao[i].idFuncionario);
                        servicosCadastrados.push({idServico: executaFuncao[i].idServico, descricaoServico: servico.descricaoServico, precoServico: servico.precoServico, idFuncionario: executaFuncao[i].idFuncionario, nomeFuncionario: funcionario.nomeFuncionario});
                    }
                    
                    // if (qs.stringify(servicosCadastrados) !== qs.stringify(servicos)){
                    //     if (qs.stringify(servicos).length < qs.stringify(servicosCadastrados).length){
                    //         for (let i in servicosCadastrados) {
                    //             let servicoExiste = false;
                    //             for (let j in servicos) {
                    //                 if (servicosCadastrados[i].idProduto === produtos[j].idProduto){
                    //                     produtoExiste = true;
                    //                 }
                    //             }
                    //             if (!produtoExiste){
                    //                 await OrdemServicoService.excluirProdutoOSDetalhes(produtosCadastrados[i].idOSDetalhes, produtosCadastrados[i].idProduto);
                    //             }
                    //         }
                    //     }
                    //     for (let i in produtos) {
                    //         let venda = await OrdemServicoService.buscarProdutoOSDetalhes(osDetalhes.idOSDetalhes, produtos[i].idProduto);
                    //         if (!venda) {
                    //             await OrdemServicoService.inserirProdutoHasOSDetalhes(produtos[i].idProduto, osDetalhes.idOSDetalhes, produtos[i].quantidade, produtos[i].precoUnitario);
                    //             break;
                    //         }
                    //         if (venda.quantidade !== produtos[i].quantidade || venda.precoUnitario !== produtos[i].precoUnitario){
                    //             await OrdemServicoService.alterarProdutoOSDetalhes(osDetalhes.idOSDetalhes, produtos[i].idProduto, produtos[i].quantidade, produtos[i].precoUnitario);
                    //         }
                    //     }
                    // }
                }
            }
        }

        res.js;
    }

}
