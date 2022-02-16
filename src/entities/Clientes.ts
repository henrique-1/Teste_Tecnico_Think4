import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Cidades } from "./Cidades";

@Entity("clientes")
export class Clientes {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  readonly id: number;

  @Column({ type: "varchar", length: 64 })
  nome: string;

  @Column({ type: "varchar", length: 11 })
  celular: string;

  @Column({ type: "varchar", length: 128 })
  email: string;

  @Exclude()
  @Column({ type: "varchar", length: 60 })
  senha: string;

  @Exclude()
  @Column({ type: "varchar", length: 11 })
  cpf: string;

  @Column({ type: "varchar", length: 8 })
  cep: string;

  @Column({ type: "bigint", unique: true, nullable: true })
  fk_cidades_id: number;

  @JoinColumn({ name: "fk_cidades_id" })
  @ManyToOne(() => Cidades, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  fkCidadesID: Cidades;

  @Column({ type: "varchar", length: 128 })
  bairro: string;

  @Column({ type: "varchar", length: 128 })
  rua: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  complemento: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at: Date;
}
