import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarCidades1644945191139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cidades",
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
            length: "35",
          },
          {
            name: "fk_estados_id",
            type: "bigint",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "ibge",
            type: "bigint",
            unsigned: true,
          },
        ],
        foreignKeys: [
          {
            name: "IBFK_ESTADOS_ID",
            referencedTableName: "estados",
            referencedColumnNames: ["id"],
            columnNames: ["fk_estados_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cidades");
  }
}
