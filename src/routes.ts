import { Router } from "express";
import { ListarProdutosController } from "./controllers/ProdutosController";
import {
  ListarPedidosController,
  ListarProdutosPedidosController,
  AlterarProdutoPedido_PedidoController,
  FinalizarPedido,
} from "./controllers/PedidosController";

const listarProdutosController = new ListarProdutosController();

const listarPedidosController = new ListarPedidosController();
const listarProdutosPedidosController = new ListarProdutosPedidosController();
const alterarProdutoPedido_PedidoController =
  new AlterarProdutoPedido_PedidoController();
const finalizarPedido = new FinalizarPedido();

export const router = Router();

router.get("/produtos/:id?", listarProdutosController.handle);

router.get("/pedidos/:id/:finished", listarPedidosController.handle);
router.get("/pedidos/produtos/:id", listarProdutosPedidosController.handle);
router.post("/pedidos", alterarProdutoPedido_PedidoController.handle);

router.put("/pedidos:cliente_id", finalizarPedido.handle);
