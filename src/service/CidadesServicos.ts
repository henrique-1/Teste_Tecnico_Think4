import { getCustomRepository } from "typeorm";
import { CidadesRepositorios } from "../repositories/CidadeRepositorios";

export class ListarCidadeServico {
  async execute(id) {
    const cidadesRepositorios = getCustomRepository(CidadesRepositorios);

    const cidade = await cidadesRepositorios.findOne(id);

    return cidade;
  }
}

export class ListarCidadesServico {
  async execute() {
    const cidadesRepositorios = getCustomRepository(CidadesRepositorios);

    const cidade = await cidadesRepositorios.find();

    return cidade;
  }
}

export class Listar_Estados_Cidades_Servico {
  async execute(fk_estados_id) {
    const cidadesRepositorios = getCustomRepository(CidadesRepositorios);

    const cidade = await cidadesRepositorios.find(fk_estados_id);

    return cidade;
  }
}
