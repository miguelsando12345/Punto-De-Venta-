import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Producto } from "./Producto";
import { Comandas } from "./Comandas";

@Entity()
export class DetalleComanda {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comandas, (comanda) => comanda.detalles)
  comanda: Comandas;

  @ManyToOne(() => Producto, (producto) => producto.detalles)
  producto: Producto;

  @Column()
  cantidad: number;

  @Column("decimal", { precision: 10, scale: 2 })
  precioUnitario: number;
}
