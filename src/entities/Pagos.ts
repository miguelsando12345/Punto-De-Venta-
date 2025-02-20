import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("pagos") // Nombre de la tabla en la BD
export class Pagos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: false })
  usuarioId!: number; // Relación con el usuario que realiza el pago

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  monto!: number; // Monto total del pago

  @Column({ type: "varchar", length: 50, nullable: false })
  metodoPago!: string; // Método de pago (ej. tarjeta, efectivo, transferencia)

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fechaPago!: Date; // Fecha en que se realizó el pago

  @Column({ type: "boolean", default: true })
  procesado!: boolean; // Indica si el pago fue procesado correctamente

  @Column({ type: "varchar", length: 255, nullable: true })
  descripcion?: string; // Descripción opcional del pago

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  actualizadoEn!: Date; // Fecha de la última actualización

}
