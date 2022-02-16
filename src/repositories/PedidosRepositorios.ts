import { EntityRepository, Repository } from "typeorm";
import { Pedidos } from "../entities/Pedidos";

@EntityRepository(Pedidos)
export class PedidosRepositorios extends Repository<Pedidos> {}
