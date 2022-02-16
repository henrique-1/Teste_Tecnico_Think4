import { NextFunction, Request, Response } from "express";
import {
  ListarPedidosServico,
  CriarPedidosServico,
  AlterarPedidosServico,
} from "../service/PedidosServicos";
import {
  CadastrarProdutoPedidoServico,
  ListarProdutosPedidosServico,
  AlterarProdutosPedidosServico,
  RemoverProdutosPedidosServico,
} from "../service/PedidosProdutosServicos";
import {
  AlterarProdutosServico,
  ListarProdutosServico,
} from "../service/ProdutosServicos";

// Cria-se um controlador para listar todos os pedidos
export class ListarPedidosController {
  async handle(request: Request, response: Response) {
    const { fk_clientes_id } = request.params;
    const { finished } = request.body;

    const listarPedidosServico = new ListarPedidosServico();

    const pedidos = await listarPedidosServico.execute(
      +fk_clientes_id,
      +finished
    );

    response.json(pedidos);
  }
}

//Cria-se um controlador para listar todos os pedidos em conjunto com seus produtos
export class ListarProdutosPedidosController {
  async handle(request: Request, response: Response) {
    const { fk_clientes_id } = request.params;
    const { finished } = request.body;

    const listarPedidosServico = new ListarPedidosServico();

    const pedidos = await listarPedidosServico.execute(
      +fk_clientes_id,
      +finished
    );

    const listarProdutosPedidosServico = new ListarProdutosPedidosServico();

    const produtosPedidos = await listarProdutosPedidosServico.execute(
      +pedidos[0].id
    );

    return response.json(produtosPedidos);
  }
}

//Efetua-se a alteração dos pedidos ligados aos produtos
export class AlterarProdutoPedido_PedidoController {
  async handle(request: Request, response: Response) {
    const { cliente_id, produto_id, quantidade } = request.body;

    const listarPedidosServico = new ListarPedidosServico();
    const listarProdutosServico = new ListarProdutosServico();
    const alterarProdutosServico = new AlterarProdutosServico();
    const alterarPedidosServico = new AlterarPedidosServico();
    const cadastrarProdutoPedidoServico = new CadastrarProdutoPedidoServico();
    const listarProdutosPedidosServico = new ListarProdutosPedidosServico();
    const alterarProdutosPedidosServico = new AlterarProdutosPedidosServico();
    const removerProdutosPedidosServico = new RemoverProdutosPedidosServico();

    const pedidos = await listarPedidosServico.execute(+cliente_id, +0);

    if (typeof pedidos[0] === undefined) {
      const criarPedidosServico = new CriarPedidosServico();
      await criarPedidosServico.execute({
        fk_clientes_id: cliente_id,
        valor: 0,
        finished: 0,
      });
    }

    const produtos = await listarProdutosServico.execute(+produto_id);

    const listarProdutosPedidos = await listarProdutosPedidosServico.execute(
      +pedidos[0].id,
      +produto_id
    );
    const preco_produto: number = produtos[0].preco * quantidade;
    const preco_pedido: number = preco_produto + pedidos[0].valor;

    const nova_qtd_estoque: number = produtos[0].qtd_estoque - quantidade;

    if (typeof listarProdutosPedidos === "undefined") {
      if (nova_qtd_estoque < 0) {
        throw new Error(
          "Não foi possível realizar a operação. Estoque insuficiente"
        );
      }

      await alterarProdutosServico.execute(+produto_id, +nova_qtd_estoque);
      await alterarPedidosServico.execute(pedidos[0].id, preco_pedido, 0);

      const produtoPedido = await cadastrarProdutoPedidoServico.execute({
        fk_pedidos_id: pedidos[0].id,
        fk_produtos_id: produto_id,
        qtd_produto: quantidade,
        preco: preco_produto,
      });

      return response.json(produtoPedido);
    } else {
      if (listarProdutosPedidos[0].qtd_produto - quantidade <= 0) {
        let sum: number = 0;

        for (let i = 0; produtos[0].qtd_produto - quantidade == 0; i++) {
          sum++;
        }

        const nova_qtd_estoque = (await sum) + produtos[0].qtd_produto;

        const preco_pedido = pedidos[0].valor - produtos[0].preco * sum;

        await alterarProdutosServico.execute(+produto_id, +nova_qtd_estoque);
        await alterarPedidosServico.execute(pedidos[0].id, preco_pedido, 0);

        const produtoPedido = await removerProdutosPedidosServico.execute(
          pedidos[0].id,
          +produto_id
        );

        return response.json(produtoPedido);
      } else if (
        listarProdutosPedidos[0].qtd_produto - quantidade > 0 &&
        listarProdutosPedidos[0].qtd_produto > quantidade
      ) {
        const novo_preco_produto: number =
          listarProdutosPedidos[0].preco - preco_produto;

        const nova_qtd_estoque: number = produtos[0].qtd_estoque + quantidade;

        await alterarProdutosServico.execute(+produto_id, +nova_qtd_estoque);
        await alterarPedidosServico.execute(pedidos[0].id, preco_pedido, 0);

        const produtoPedido = await alterarProdutosPedidosServico.execute({
          fk_pedidos_id: pedidos[0].id,
          fk_produtos_id: produto_id,
          qtd_produto: quantidade,
          preco: novo_preco_produto,
        });

        return response.json(produtoPedido);
      } else if (
        listarProdutosPedidos[0].qtd_produto - quantidade > 0 &&
        listarProdutosPedidos[0].qtd_produto < quantidade
      ) {
        const novo_preco_produto: number =
          listarProdutosPedidos[0].preco + preco_produto;

        if (nova_qtd_estoque < 0) {
          throw new Error(
            "Não foi possível realizar a operação. Estoque insuficiente"
          );
        }

        await alterarProdutosServico.execute(+produto_id, +nova_qtd_estoque);
        await alterarPedidosServico.execute(pedidos[0].id, preco_pedido, 0);

        const produtoPedido = await alterarProdutosPedidosServico.execute({
          fk_pedidos_id: pedidos[0].id,
          fk_produtos_id: produto_id,
          qtd_produto: quantidade,
          preco: novo_preco_produto,
        });

        return response.json(produtoPedido);
      }
    }
  }
}

//Finaliza-se o pedido
export class FinalizarPedido {
  async handle(request: Request, response: Response) {
    const { cliente_id } = request.params;
    const { finished } = request.body;

    const alterarPedidosServico = new AlterarPedidosServico();
    const alterarPedidos = await alterarPedidosServico.execute(+cliente_id, 1);

    return response.json(alterarPedidos);
  }
}
