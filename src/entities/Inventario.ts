import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Producto } from "./Producto"; // Relación con la entidad Producto

@Entity("inventario") // Nombre de la tabla en la BD
export class Inventario {
  @PrimaryGeneratedColumn()
  id_insumo!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  nombre!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  cantidad_disponible!: number;

  @Column({ type: "enum", enum: ["Kg", "L", "Unidad"], default: "Unidad" })
  unidad_medida!: string;

  @ManyToOne(() => Producto, (producto) => producto.inventario, {
    nullable: false,
    onDelete: "CASCADE",
  })
  producto!: Producto;
}
