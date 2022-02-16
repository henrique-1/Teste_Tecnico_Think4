import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Pedidos } from "./Pedidos";
import { Produtos } from "./Produtos";

@Entity("produtos_pedidos")
export class Produtos_Pedidos {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  readonly id: number;

  @Column({ type: "integer", nullable: false, default: 1 })
  qtd_produto: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  fk_pedidos_id: number;

  @JoinColumn({ name: "fk_pedidos_id" })
  @ManyToOne(() => Pedidos, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  fkPedidosID: Pedidos;

  @Column({
    type: "bigint",
    unsigned: true,
    nullable: true,
  })
  fk_produtos_id: number;

  @JoinColumn({ name: "fk_produtos_id" })
  @ManyToOne(() => Produtos, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  fkProdutosID: Produtos;

  @Column({ type: "double", precision: 4, scale: 2 })
  preco: number;
}
