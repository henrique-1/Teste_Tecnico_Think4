import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Clientes } from "./Clientes";

@Entity("pedidos")
export class Pedidos {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  readonly id: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  fk_clientes_id: number;

  @JoinColumn({ name: "fk_clientes_id" })
  @ManyToOne(() => Clientes, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  fkClientesID: Clientes;

  @Column({ type: "double", precision: 16, scale: 2 })
  valor: number;

  @Column({ type: "tinyint", nullable: false, default: 0 })
  finished: number;

  @CreateDateColumn({ type: "datetime" })
  data_pedido: Date;
}
