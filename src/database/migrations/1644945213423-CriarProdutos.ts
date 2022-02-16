import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarProdutos1644945213423 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "produtos",
        columns: [
          {
            name: "id",
            type: "bigint",
            isPrimary: true,
            unsigned: true,
          },
          {
            name: "nome",
            type: "varchar",
            length: "128",
          },
          {
            name: "descricao",
            type: "varchar",
            length: "512",
          },
          {
            name: "preco",
            type: "double",
            precision: 4,
            scale: 2,
          },
          {
            name: "codigo",
            type: "varchar",
            length: "8",
            isUnique: true,
          },
          {
            name: "qtd_estoque",
            type: "integer",
            default: 0,
          },
          {
            name: "photo",
            type: "varchar",
            length: "512",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("produtos");
  }
}
