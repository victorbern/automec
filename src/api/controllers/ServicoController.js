const { json } = require("body-parser");
const ServicoService = require("../services/ServicoService")

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {error: '', result: []};
        let servicos = await ServicoService.buscarTodos();
        for (let i in servicos){
            json.result.push({
                idServico: servicos[i].idServico,
                descricaoServico: servicos[i].descricaoServico,
                precoServico: servicos[i].precoServico
            });
        }
        
        res.json(json);
    },

    buscarPorId: async(req, res) => {
        let json = {error: '', result: {}};
        let id = req.params.id;
        let servico = await ServicoService.buscarPorId(id);

        if(servico){
            json.result = servico;
        }

        res.json(json);
    },

    buscaPorValor: async(req, res) => {
        let json = {error: '', result: []};
        let valor = req.params.valor;
        let servicos = await ServicoService.buscaPorValor(valor);

        for (let i in servicos){
            json.result.push({
                idServico: servicos[i].idServico,
                descricaoServico: servicos[i].descricaoServico,
                precoServico: servicos[i].precoServico
            });
        }
        
        res.json(json);
    },

    inserirServico: async(req, res) => {
        let json = {error: '', result: {}};
        
        let descricaoServico = req.body.descricaoServico;
        let precoServico = req.body.precoServico;

        if(descricaoServico && precoServico){
            let IdServico = await ServicoService.inserirServico(descricaoServico, precoServico);
            json.result = {
                idServico:  IdServico,
                descricaoServico: descricaoServico,
                precoServico: precoServico
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    alterarServico: async(req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;
        let descricaoServico = req.body.descricaoServico;
        let precoServico = req.body.precoServico;

        if(id && descricaoServico && precoServico){
            await ServicoService.alterarServico(id, descricaoServico, precoServico);
            json.result = {
                id,
                descricaoServico,
                precoServico
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    excluirServico: async (req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;

        if(id){
            await ServicoService.excluirServico(id);
            json.result = {
                id
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    }

}
