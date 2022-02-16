import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarEstados1644945158097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "estados",
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
            isNullable: false,
            length: "19",
          },
          {
            name: "uf",
            type: "char",
            length: "2",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "ibge",
            type: "tinyint",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "pais",
            type: "tinyint",
            isNullable: true,
          },
          {
            name: "ddd",
            type: "varchar",
            length: "26",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("estados");
  }
}
