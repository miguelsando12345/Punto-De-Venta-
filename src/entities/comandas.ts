import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Clientes } from "./Clientes";
import { DetalleComanda } from "./DetalleComanda";
import { Mesas } from "./mesas";

@Entity()
export class Comandas {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Clientes, (cliente) => cliente.comandas, { nullable: true })
  cliente: Clientes;

  @ManyToOne(() => Mesas, (mesa) => mesa.comandas)
  mesa: Mesas;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;

  @Column({ default: false })
  pagada: boolean;

  @OneToMany(() => DetalleComanda, (detalle) => detalle.comanda)
  detalles: DetalleComanda[];
}
