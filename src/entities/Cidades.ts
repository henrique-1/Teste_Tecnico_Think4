import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Estados } from "./Estados";

@Entity("cidades")
export class Cidades {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  readonly id: number;

  @Column({ type: "varchar", length: 35 })
  nome: string;

  @Column({
    type: "bigint",
    unsigned: true,
    nullable: true,
  })
  fk_estados_id: number;

  @JoinColumn({ name: "fk_estados_id" })
  @ManyToOne(() => Estados, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  fkEstadosID: Estados;

  @Column({ type: "bigint", nullable: false, unique: true })
  ibge: number;
}
