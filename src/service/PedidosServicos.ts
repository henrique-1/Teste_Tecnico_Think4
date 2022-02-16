import { getCustomRepository } from "typeorm";
import { PedidosRepositorios } from "../repositories/PedidosRepositorios";

interface IPedidosRequest {
  fk_clientes_id: number;
  valor: number;
  finished: number;
}

export class CriarPedidosServico {
  async execute({ fk_clientes_id, valor, finished }: IPedidosRequest) {
    const pedidosRepositorios = getCustomRepository(PedidosRepositorios);

    if (!fk_clientes_id || !valor || !finished) {
      throw new Error("Dados inseridos incorretamente");
    }

    const pedidos = pedidosRepositorios.create({
      fk_clientes_id,
      valor,
      data_pedido: new Date(),
      finished,
    });

    await pedidosRepositorios.save(pedidos);

    return pedidos;
  }
}

export class ListarPedidosServico {
  async execute(fk_clientes_id: number, finished: number) {
    const pedidosRepositorios = getCustomRepository(PedidosRepositorios);

    const pedidos = await pedidosRepositorios.find({
      where: {
        fk_clientes_id: fk_clientes_id,
        finished: finished,
      },
      relations: ["fkClientesID"],
      order: {
        data_pedido: "DESC",
      },
    });

    return pedidos;
  }
}

export class AlterarPedidosServico {
  async execute(id: number, finished: number, valor?: number) {
    const pedidosRepositorios = getCustomRepository(PedidosRepositorios);

    const pedidos = await pedidosRepositorios.save({
      id: id,
      valor: valor,
      finished: finished,
    });

    return pedidos;
  }
}

export class RemoverPedidosServico {
  async execute(id: number, { fk_clientes_id }: IPedidosRequest) {
    const pedidosRepositorios = getCustomRepository(PedidosRepositorios);

    const pedidosRemovidos = await pedidosRepositorios.delete({
      id: id,
      fk_clientes_id: fk_clientes_id,
    });

    return pedidosRemovidos;
  }
}
