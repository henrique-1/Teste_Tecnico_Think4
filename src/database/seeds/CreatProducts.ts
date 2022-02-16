import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { Produtos } from "../../entities/Produtos";
export default class CriarClientes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Produtos)
      .values([
        {
          id: 1,
          nome: "Nike Air Max",
          descricao: "",
          preco: 432.24,
          codigo: "NKAMX447",
          qtd_estoque: 150,
          photo:
            "https://th.bing.com/th/id/R.9f8e125587bf89e1c9f0b12eb8846d1e?rik=CmivkBmxTGS7FA&riu=http%3a%2f%2fsneakersaddict.com%2fimages%2fNike-Air-Max-90-Infrared-Retro-724882-100-2015-01.jpg&ehk=IsKxmjHSRp8DpFHXaOc1nW2GM%2fWJTnY%2bATMCqzXymas%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          nome: "Nike Air Max",
          descricao: "",
          preco: 432.24,
          codigo: "NKAMX721",
          qtd_estoque: 150,
          photo:
            "https://static.shoptimao.com.br/produtos/tenis-infantil-nike-md-runner-2-gs/92/D12-2120-392/D12-2120-392_zoom1.jpg?ts=1625114201",
        },
        {
          id: 3,
          nome: "Nike Air Max",
          descricao: "",
          preco: 432.24,
          codigo: "NKAMX451",
          qtd_estoque: 150,
          photo:
            "https://static.shoptimao.com.br/produtos/tenis-infantil-nike-md-runner-2-gs/92/D12-2120-392/D12-2120-392_zoom1.jpg?ts=1625114201",
        },
        {
          id: 4,
          nome: "Nike Air Max",
          descricao: "",
          preco: 432.24,
          codigo: "NKAMX462",
          qtd_estoque: 150,
          photo:
            "https://static.shoptimao.com.br/produtos/tenis-infantil-nike-md-runner-2-gs/92/D12-2120-392/D12-2120-392_zoom1.jpg?ts=1625114201",
        },
        {
          id: 5,
          nome: "Nike Air Max",
          descricao: "",
          preco: 432.24,
          codigo: "NKAMX443",
          qtd_estoque: 150,
          photo:
            "https://static.shoptimao.com.br/produtos/tenis-infantil-nike-md-runner-2-gs/92/D12-2120-392/D12-2120-392_zoom1.jpg?ts=1625114201",
        },
      ])
      .execute();
  }
}
