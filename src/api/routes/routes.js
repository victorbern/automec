const express = require("express");
const router = express.Router();

const ClienteController = require("../controllers/ClienteController");
const FuncionarioController = require("../controllers/FuncionarioController");
const OrdemServicoController = require("../controllers/OrdemServicoController");
const ProdutoController = require("../controllers/ProdutoController");
const VeiculoController = require("../controllers/VeiculoController");

// APIs para cliente
router.get('/clientes', ClienteController.buscarTodos);
router.get('/cliente/:id', ClienteController.buscarPorId);
router.post('/cliente', ClienteController.inserirCliente);
router.put('/cliente/:id', ClienteController.alterarCliente);
router.delete('/cliente/:id', ClienteController.excluirCliente);
router.get('/clientes/:valor', ClienteController.buscaInteligente);

// APIs para funcionários
router.get('/funcionarios', FuncionarioController.buscarTodos);
router.get('/funcionario/:id', FuncionarioController.buscarPorId);
router.post('/funcionario', FuncionarioController.inserirFuncionario);
router.put('/funcionario/:id', FuncionarioController.alterarFuncionario);
// router.delete('/cliente/:id', ClienteController.excluirCliente);

// APIs para produtos
router.get('/produtos', ProdutoController.buscarTodos);
router.get('/produto/:id', ProdutoController.buscarPorId);
router.post('/produto', ProdutoController.inserirProduto);
router.put('/produto/:id', ProdutoController.alterarProduto);
// router.delete('/cliente/:id', ClienteController.excluirCliente);

// APIs para veículos
router.get('/veiculos', VeiculoController.buscarTodos);
router.get('/veiculo/:placa', VeiculoController.buscarPorPlaca);
router.post('/veiculo', VeiculoController.inserirVeiculo);
router.put('/veiculo/:placa', VeiculoController.alterarVeiculo);
router.get('/veiculo-por-cliente/:idCliente', VeiculoController.buscarPorCliente);
// router.delete('/cliente/:id', ClienteController.excluirCliente);

// APIs para Serviços
// router.get('/clientes', ClienteController.buscarTodos);
// router.get('/cliente/:id', ClienteController.buscarPorId);
// router.post('/cliente', ClienteController.inserirCliente);
// router.put('/cliente/:id', ClienteController.alterarCliente);
// router.delete('/cliente/:id', ClienteController.excluirCliente);


// APIs para ordens de serviço
router.get('/ordens-servico', OrdemServicoController.buscarTodos);
router.get('/ordem-servico/:id', OrdemServicoController.buscarPorId);
// router.post('/cliente', ClienteController.inserirCliente);
router.put('/ordem-servico/:id', OrdemServicoController.alterarOrdemServico);
// router.delete('/cliente/:id', ClienteController.excluirCliente);

module.exports = router;