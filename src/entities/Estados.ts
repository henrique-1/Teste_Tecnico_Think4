import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("estados")
export class Estados {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  readonly id: number;

  @Column({ type: "varchar", length: 20 })
  name: string;

  @Column({ type: "varchar", length: 2, unique: true })
  uf: string;

  @Column({ type: "tinyint", nullable: false, unique: true })
  ibge: number;

  @Column({ type: "tinyint" })
  pais: number;

  @Column({ type: "varchar", length: 26 })
  ddd: string;
}
