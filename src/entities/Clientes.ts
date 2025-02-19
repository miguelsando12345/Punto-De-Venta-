import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comandas } from "./Comandas";

@Entity()
export class Clientes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  telefono: string;

  @OneToMany(() => Comandas, (comanda) => comanda.cliente)
  comandas: Comandas[];
}
