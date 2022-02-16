import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarClientes1644945200960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clientes",
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
            length: "64",
          },
          {
            name: "celular",
            type: "char",
            length: "11",
          },
          {
            name: "email",
            type: "varchar",
            length: "128",
          },
          {
            name: "senha",
            type: "char",
            length: "60",
          },
          {
            name: "cpf",
            type: "char",
            length: "11",
            isUnique: true,
          },
          {
            name: "cep",
            type: "char",
            length: "8",
          },
          {
            name: "fk_cidades_id",
            type: "bigint",
            unsigned: true,
          },
          {
            name: "bairro",
            type: "varchar",
            length: "128",
          },
          {
            name: "rua",
            type: "varchar",
            length: "128",
          },
          {
            name: "complemento",
            type: "varchar",
            length: "64",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "datetime",
          },
          {
            name: "updated_at",
            type: "datetime",
          },
        ],
        foreignKeys: [
          {
            name: "IBFK_CIDADES_ID",
            referencedTableName: "cidades",
            referencedColumnNames: ["id"],
            columnNames: ["fk_cidades_id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clientes");
  }
}
