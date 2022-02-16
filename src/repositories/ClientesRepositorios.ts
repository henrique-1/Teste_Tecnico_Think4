import { EntityRepository, Repository } from "typeorm";
import { Clientes } from "../entities/Clientes";

@EntityRepository(Clientes)
export class ClientesRepositorios extends Repository<Clientes> {}
