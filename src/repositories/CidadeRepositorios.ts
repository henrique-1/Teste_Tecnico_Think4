import { EntityRepository, Repository } from "typeorm";
import { Cidades } from "../entities/Cidades";

@EntityRepository(Cidades)
export class CidadesRepositorios extends Repository<Cidades> {}
