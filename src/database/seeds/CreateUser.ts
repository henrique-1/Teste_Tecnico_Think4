import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { Clientes } from "../../entities/Clientes";

export default class CriarClientes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Clientes)
      .values([
        {
          id: 1,
          nome: "Henrique Bissoli Malaman Alonso",
          celular: "19997121205",
          email: "contato.henrique.bissoli@gmail.com",
          senha: (await hash("123456789", 8)).toString(),
          cpf: "11111111111",
          cep: "13874439",
          fk_cidades_id: 1,
          bairro: "Jardim Recanto do Bosque",
          rua: "Rua Nagib Miguel, 4035",
          complemento: "Casa 360",
        },
      ])
      .execute();
  }
}
