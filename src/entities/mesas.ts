import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comandas } from "./Comandas";

@Entity()
export class Mesas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column({ default: true })
  disponible: boolean;

  @OneToMany(() => Comandas, (comanda) => comanda.mesa)
  comandas: Comandas[];
}
