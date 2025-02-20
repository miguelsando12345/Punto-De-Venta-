import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("inventario") // Nombre de la tabla en la BD
export class Inventario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: false })
  productoId!: number; // Relación con el producto del inventario

  @Column({ type: "int", nullable: false })
  cantidad!: number; // Cantidad del producto en inventario

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  costoUnitario!: number; // Costo por unidad del producto

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  valorTotal!: number; // Valor total del inventario para ese producto

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date; // Fecha de creación del registro

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date; // Fecha de última actualización del registro
}
