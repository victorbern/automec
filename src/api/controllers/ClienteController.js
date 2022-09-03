const { json } = require("body-parser");
const ClienteService = require("../services/ClienteService");

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {error: '', result: {clientes: [], totalClientes: []}};
        let paginaAtual = req.query.paginaAtual;
        let qtdClientes = req.query.qtdClientes;
        let clientes;
        if (paginaAtual && qtdClientes){
            let inicio = (paginaAtual-1)*qtdClientes;
            qtdClientes = qtdClientes*1;
            clientes = await ClienteService.buscarTodos(inicio, qtdClientes);
        } else {
            clientes = await ClienteService.buscarTodos(0, 10);
        }
        let totalClientes = await ClienteService.buscarTotalClientes();
        for (let i in clientes){
            json.result.clientes.push({
                idCliente: clientes[i].idCliente,
                nomeCliente: clientes[i].nomeCliente,
                cpfCnpj: clientes[i].cpfCnpj,
                celularCliente: clientes[i].celularCliente,
                cep: clientes[i].cep,
                endereco: clientes[i].endereco,
                numero: clientes[i].numero,
                cidade: clientes[i].cidade,
                uf: clientes[i].uf,
                complemento: clientes[i].complemento
            });
        }
        json.result.totalClientes = totalClientes;
        console.log(json.result);
        res.json(json);
    },

    buscarPorId: async(req, res) => {
        let json = {error: '', result: {}};
        let id = req.params.id;
        let cliente = await ClienteService.buscarPorId(id);

        if(cliente){
            json.result = cliente;
        }

        res.json(json);
    },

    buscaPorValor: async(req, res) => {
        let json = {error: '', result: {clientes: [], totalClientes: {}}};
        let valor = req.params.valor;
        
        let paginaAtual = req.query.paginaAtual;
        let qtdClientes = req.query.qtdClientes;

        let clientes;
        if (paginaAtual && qtdClientes){
            let inicio = (paginaAtual-1)*qtdClientes;
            qtdClientes = qtdClientes*1;
            clientes = await ClienteService.buscaPorValor(valor, inicio, qtdClientes);
        } else {
            clientes = await ClienteService.buscaPorValor(valor, 0, 10);
        }
        let totalClientes = await ClienteService.buscarTotalClientesPorValor(valor);

        for (let i in clientes){
            json.result.clientes.push({
                idCliente: clientes[i].idCliente,
                nomeCliente: clientes[i].nomeCliente,
                cpfCnpj: clientes[i].cpfCnpj,
                celularCliente: clientes[i].celularCliente,
                cep: clientes[i].cep,
                endereco: clientes[i].endereco,
                numero: clientes[i].numero,
                cidade: clientes[i].cidade,
                uf: clientes[i].uf,
                complemento: clientes[i].complemento
            });
        }
        json.result.totalClientes = totalClientes;
        res.json(json);
    },

    inserirCliente: async(req, res) => {
        let json = {error: '', result: {}};
        
        let nomeCliente = req.body.nomeCliente;
        let cpfCnpj = req.body.cpfCnpj;
        let celularCliente = req.body.celularCliente;
        let cep = req.body.cep;
        let endereco = req.body.endereco;
        let numero = req.body.numero;
        let cidade = req.body.cidade;
        let uf = req.body.uf;
        let complemento = req.body.complemento;

        if(nomeCliente && celularCliente && cpfCnpj){
            let IdCliente = await ClienteService.inserirCliente(nomeCliente, cpfCnpj, celularCliente, cep, 
                            endereco, numero, cidade, uf, complemento);
            json.result = {
                id: IdCliente,
                nomeCliente,
                cpfCnpj,
                celularCliente,
                cep,
                endereco,
                numero,
                cidade,
                uf,
                complemento
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    alterarCliente: async(req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;
        let nomeCliente = req.body.nomeCliente;
        let cpfCnpj = req.body.cpfCnpj;
        let celularCliente = req.body.celularCliente;
        let cep = req.body.cep;
        let endereco = req.body.endereco;
        let numero = req.body.numero;
        let cidade = req.body.cidade;
        let uf = req.body.uf;
        let complemento = req.body.complemento;

        if(nomeCliente && celularCliente && cpfCnpj && id){
            await ClienteService.alterarCliente(id, nomeCliente, cpfCnpj, celularCliente, cep,
                endereco, numero, cidade, uf, complemento);
            json.result = {
                id,
                nomeCliente,
                cpfCnpj,
                celularCliente,
                cep,
                endereco,
                numero,
                cidade,
                uf,
                complemento
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    excluirCliente: async (req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;

        if(id){
            await ClienteService.excluirCliente(id);
            json.result = {
                id
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    }

}
