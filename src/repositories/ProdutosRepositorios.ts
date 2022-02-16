import { EntityRepository, Repository } from "typeorm";
import { Produtos } from "../entities/Produtos";

@EntityRepository(Produtos)
export class ProdutosRepositorios extends Repository<Produtos> {}
