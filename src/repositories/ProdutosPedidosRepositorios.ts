import { EntityRepository, Repository } from "typeorm";
import { Produtos_Pedidos } from "../entities/Produtos_pedidos";

@EntityRepository(Produtos_Pedidos)
export class ProdutosPedidosRepositorios extends Repository<Produtos_Pedidos> {}
