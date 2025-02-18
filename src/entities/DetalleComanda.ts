import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Comanda } from "./Comanda";
import { Producto } from "./Producto";

@Entity("detalle_comanda") // Nombre de la tabla en la BD
export class DetalleComanda {
  @PrimaryGeneratedColumn()
  id_detalle!: number;

  @ManyToOne(() => Comanda, (comanda) => comanda.detalles, {
    nullable: false,
    onDelete: "CASCADE",
  })
  comanda!: Comanda;

  @ManyToOne(() => Producto, (producto) => producto.detalles, {
    nullable: false,
    onDelete: "CASCADE",
  })
  producto!: Producto;

  @Column({ type: "int", nullable: false })
  cantidad!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  precio_unitario!: number;
}
