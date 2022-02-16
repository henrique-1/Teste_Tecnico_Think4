import { getCustomRepository } from "typeorm";
import { EstadosRepositorios } from "../repositories/EstadosRepositorios";

export class ListarEstadoServico {
  async execute(id) {
    const estadosRepositorios = getCustomRepository(EstadosRepositorios);

    const estado = await estadosRepositorios.findOne(id);

    return estado;
  }
}

export class ListarEstadosServico {
  async execute() {
    const estadosRepositorios = getCustomRepository(EstadosRepositorios);

    const estado = await estadosRepositorios.find();

    return estado;
  }
}
