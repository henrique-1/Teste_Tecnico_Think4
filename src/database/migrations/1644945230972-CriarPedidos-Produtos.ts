import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarPedidosProdutos1644945230972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "produtos_pedidos",
        columns: [
          {
            name: "id",
            type: "bigint",
            isPrimary: true,
            unsigned: true,
          },
          {
            name: "qtd_produto",
            type: "integer",
            default: 1,
          },
          {
            name: "preco",
            type: "double",
            precision: 4,
            scale: 2,
          },
          {
            name: "fk_pedidos_id",
            type: "bigint",
            unsigned: true,
          },
          {
            name: "fk_produtos_id",
            type: "bigint",
            unsigned: true,
          },
        ],
        foreignKeys: [
          {
            name: "IBFK_PEDIDOS_ID",
            referencedTableName: "pedidos",
            referencedColumnNames: ["id"],
            columnNames: ["fk_pedidos_id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "IBFK_PRODUTOS_ID",
            referencedTableName: "produtos",
            referencedColumnNames: ["id"],
            columnNames: ["fk_produtos_id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("produtos_pedidos");
  }
}
