import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Comandas } from "./comandas";
import { MetodosPago } from "./MetodosPago";

@Entity()
export class Pagos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comandas, (comanda) => comanda.id)
  comanda: Comandas;

  @ManyToOne(() => MetodosPago, (metodo) => metodo.pagos)
  metodoPago: MetodosPago;

  @Column("decimal", { precision: 10, scale: 2 })
  monto: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;
}
