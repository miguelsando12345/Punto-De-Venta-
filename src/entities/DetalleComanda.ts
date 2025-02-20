import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("detalle_comanda") // Nombre de la tabla en la BD
export class DetalleComanda {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: false })
  comandaId!: number; // ID de la comanda a la que pertenece el detalle

  @Column({ type: "int", nullable: false })
  productoId!: number; // ID del producto incluido en la comanda

  @Column({ type: "int", nullable: false })
  cantidad!: number; // Cantidad del producto solicitado

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  precioUnitario!: number; // Precio unitario del producto

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  subtotal!: number; // Subtotal calculado (cantidad * precio unitario)

  @Column({ type: "varchar", length: 255, nullable: true })
  notas?: string; // Notas o instrucciones especiales para el pedido

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date; // Fecha de creación del registro

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date; // Fecha de última actualización del registro
}
