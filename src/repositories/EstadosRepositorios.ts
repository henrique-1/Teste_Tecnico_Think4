import { EntityRepository, Repository } from "typeorm";
import { Estados } from "../entities/Estados";

@EntityRepository(Estados)
export class EstadosRepositorios extends Repository<Estados> {}
