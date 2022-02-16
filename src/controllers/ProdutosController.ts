import { Request, Response } from "express";
import { ListarProdutosServico } from "../service/ProdutosServicos";

//Cria-se um controlador para listar os produtos
export class ListarProdutosController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const listarProdutosServico = new ListarProdutosServico();

    const produtos = await listarProdutosServico.execute(+id);

    return response.json(produtos);
  }
}
