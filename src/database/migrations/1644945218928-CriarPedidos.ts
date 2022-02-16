import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarPedidos1644945218928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pedidos",
        columns: [
          {
            name: "id",
            type: "bigint",
            isPrimary: true,
            unsigned: true,
          },
          {
            name: "fk_clientes_id",
            type: "bigint",
            unsigned: true,
          },
          {
            name: "valor",
            type: "double",
            precision: 16,
            scale: 2,
          },
          {
            name: "finished",
            type: "tinyint",
            default: "0",
          },
          {
            name: "data_pedido",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "IBFK_CLIENTES_ID",
            referencedTableName: "clientes",
            referencedColumnNames: ["id"],
            columnNames: ["fk_clientes_id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("pedidos");
  }
}
