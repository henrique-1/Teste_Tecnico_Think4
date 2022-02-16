import { Entity, PrimaryColumn, Column } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("produtos")
export class Produtos {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  readonly id: number;

  @Column({ type: "varchar", length: 128 })
  nome: string;

  @Column({ type: "varchar", length: 256 })
  descricao: string;

  @Column({ type: "double", precision: 4, scale: 2 })
  preco: number;

  @Column({ type: "varchar", length: 8, nullable: false, unique: true })
  codigo: string;

  @Column({ type: "integer", nullable: false, default: 0 })
  qtd_estoque: number;

  @Column({ type: "varchar", length: 512, nullable: true })
  photo: string;
}
