import { getCustomRepository } from "typeorm";
import { ProdutosPedidosRepositorios } from "../repositories/ProdutosPedidosRepositorios";

interface IPedidosProdutosRequest {
  qtd_produto: number;
  fk_pedidos_id: number;
  fk_produtos_id?: number;
  preco: number;
}

export class CadastrarProdutoPedidoServico {
  async execute({
    qtd_produto,
    fk_pedidos_id,
    fk_produtos_id,
    preco,
  }: IPedidosProdutosRequest) {
    const produtosPedidosRepositorios = getCustomRepository(
      ProdutosPedidosRepositorios
    );

    if (!qtd_produto || !fk_pedidos_id || !fk_produtos_id || !preco) {
      throw new Error("Dados inseridos incorretamente");
    }

    const produtosPedidos = produtosPedidosRepositorios.create({
      qtd_produto: qtd_produto,
      fk_pedidos_id: fk_pedidos_id,
      fk_produtos_id: fk_pedidos_id,
      preco: preco,
    });

    await produtosPedidosRepositorios.save(produtosPedidos);

    return produtosPedidos;
  }
}

export class ListarProdutosPedidosServico {
  async execute(fk_pedidos_id: number, fk_produtos_id?: number) {
    const produtosPedidosRepositorios = getCustomRepository(
      ProdutosPedidosRepositorios
    );

    if (!fk_produtos_id) {
      const produtosPedidos = await produtosPedidosRepositorios.find({
        where: {
          fk_pedidos_id: fk_pedidos_id,
        },
      });

      return produtosPedidos;
    } else {
      const produtosPedidos = await produtosPedidosRepositorios.find({
        where: {
          fk_pedidos_id: fk_pedidos_id,
          fk_produtos_id: fk_produtos_id,
        },
      });

      return produtosPedidos;
    }
  }
}

export class RemoverProdutosPedidosServico {
  async execute(fk_pedidos_id: number, fk_produtos_id: number) {
    const produtosPedidosRepositorios = getCustomRepository(
      ProdutosPedidosRepositorios
    );

    const removerProdutosPedidos = await produtosPedidosRepositorios.delete({
      fk_pedidos_id: fk_pedidos_id,
      fk_produtos_id: fk_produtos_id,
    });

    return removerProdutosPedidos;
  }
}

export class AlterarProdutosPedidosServico {
  async execute({
    fk_pedidos_id,
    fk_produtos_id,
    qtd_produto,
    preco,
  }: IPedidosProdutosRequest) {
    const produtosPedidosRepositorios = getCustomRepository(
      ProdutosPedidosRepositorios
    );

    const pedidoProduto = await produtosPedidosRepositorios.save({
      where: {
        fk_pedidos_id: fk_pedidos_id,
        fk_produtos_id: fk_produtos_id,
      },
      qtd_produto: qtd_produto,
      preco: preco,
    });

    return pedidoProduto;
  }
}
