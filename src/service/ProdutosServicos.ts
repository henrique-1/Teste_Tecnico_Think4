import { getCustomRepository } from "typeorm";
import { ProdutosRepositorios } from "../repositories/ProdutosRepositorios";

interface IProdutoRequest {
  nome: string;
  descricao: string;
  preco: number;
  codigo: string;
  qtd_estoque: number;
  photo: string;
}

export class CadastrarProdutoServico {
  async execute({
    nome,
    descricao,
    preco,
    codigo,
    qtd_estoque,
    photo,
  }: IProdutoRequest) {
    const produtosRepositorios = getCustomRepository(ProdutosRepositorios);

    if (!nome || !descricao || !preco || !codigo) {
      throw new Error("Dados inseridos incorretamente");
    }

    const produtoJaExiste = await produtosRepositorios.findOne({ codigo });

    if (produtoJaExiste) {
      throw new Error("Produto já existente");
    }

    const produto = produtosRepositorios.create({
      nome,
      descricao,
      preco,
      codigo,
      qtd_estoque,
      photo,
    });

    await produtosRepositorios.save(produto);

    return produto;
  }
}

export class ListarProdutosServico {
  async execute(id?: number) {
    const produtosRepositorios = getCustomRepository(ProdutosRepositorios);

    if (id) {
      const produto = await produtosRepositorios.findOne({
        where: {
          id: id,
        },
      });

      return produto;
    } else {
      const produto = await produtosRepositorios.find();

      return produto;
    }
  }
}

export class AlterarProdutosServico {
  async execute(id: number, qtd_estoque: number) {
    const produtosRepositorios = getCustomRepository(ProdutosRepositorios);

    const produto = await produtosRepositorios.save({
      id: id,
      qtd_estoque: qtd_estoque,
    });

    return produto;
  }
}
