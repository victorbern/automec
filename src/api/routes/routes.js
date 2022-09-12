const express = require("express");
const router = express.Router();

const ClienteController = require("../controllers/ClienteController");
const FuncionarioController = require("../controllers/FuncionarioController");
const OrdemServicoController = require("../controllers/OrdemServicoController");
const ProdutoController = require("../controllers/ProdutoController");
const ServicoController = require("../controllers/ServicoController");
const VeiculoController = require("../controllers/VeiculoController");

// APIs para cliente
router.get('/clientes', ClienteController.buscarTodos); // Buscar todos os clientes
router.get('/cliente/:id', ClienteController.buscarPorId); // Buscar cliente por id
router.post('/cliente', ClienteController.inserirCliente); // Inserir novo cliente no banco de dados
router.put('/cliente/:id', ClienteController.alterarCliente); // Alterar dados de um cliente
router.delete('/cliente/:id', ClienteController.excluirCliente); // Deletar um cliente do banco de dados
router.get('/clientes/:valor', ClienteController.buscaPorValor); // Buscar cliente por nome e/ou cpfCnpj

// APIs para funcionários
router.get('/funcionarios', FuncionarioController.buscarTodos); // Buscar todos os funcionários
router.get('/funcionario/:id', FuncionarioController.buscarPorId); // Buscar funcionário por id
router.post('/funcionario', FuncionarioController.inserirFuncionario); // Inserir novo funcionário no banco de dados
router.put('/funcionario/:id', FuncionarioController.alterarFuncionario); // Alterar dados de um funcionário
router.delete('/funcionario/:id', FuncionarioController.excluirFuncionario); // Deletar um funcionario do banco de dados
router.get('/funcionarios/:valor', FuncionarioController.buscaPorValor); // Buscar funcionario por nomeFuncionario e funcao

// APIs para produtos
router.get('/produtos', ProdutoController.buscarTodos);
router.get('/produto/:id', ProdutoController.buscarPorId);
router.post('/produto', ProdutoController.inserirProduto);
router.put('/produto/:id', ProdutoController.alterarProduto);
router.put('/alterar-estoque/:id', ProdutoController.alterarEstoque);
router.delete('/produto/:id', ProdutoController.excluirProduto);
router.get('/produtos/:valor', ProdutoController.buscaPorValor); // Buscar produto por descricao ou por código de barras

// APIs para veículos
router.get('/veiculos', VeiculoController.buscarTodos);
router.get('/veiculo/:placa', VeiculoController.buscarPorPlaca);
router.post('/veiculo', VeiculoController.inserirVeiculo);
router.put('/veiculo/:placa', VeiculoController.alterarVeiculo);
router.get('/veiculo-por-cliente/:idCliente', VeiculoController.buscarPorCliente);
router.delete('/veiculo/:placa', VeiculoController.excluirVeiculo);
router.get('/veiculos/:valor', VeiculoController.buscaPorValor);

// APIs para Serviços
router.get('/servicos', ServicoController.buscarTodos);
router.get('/servico/:id', ServicoController.buscarPorId);
router.post('/servico', ServicoController.inserirServico);
router.put('/servico/:id', ServicoController.alterarServico);
router.delete('/servico/:id', ServicoController.excluirServico);
router.get('/servicos/:valor', ServicoController.buscaPorValor); // Buscar servico por idServico e/ou descricao

// APIs para ordens de serviço
router.get('/ordens-servico', OrdemServicoController.buscarTodos);
router.get('/ordem-servico/:id', OrdemServicoController.buscarPorId);
router.post('/ordem-servico', OrdemServicoController.inserirOrdemServico);
router.put('/ordem-servico/:id', OrdemServicoController.alterarOrdemServico);
// router.delete('/cliente/:id', ClienteController.excluirCliente);
router.get('/ordens-servico/:valor', OrdemServicoController.buscaPorValor); // Buscar cliente por nome e/ou cpfCnpj

module.exports = router;