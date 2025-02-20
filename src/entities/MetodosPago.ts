import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("metodos_pago") // Nombre de la tabla en la BD
@Unique(["nombre"]) // Evita duplicados en el nombre del método de pago
export class MetodosPago {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  nombre!: string; // Nombre del método de pago (ej. tarjeta de crédito, efectivo, transferencia)

  @Column({ type: "text", nullable: true })
  descripcion?: string; // Descripción opcional sobre el método de pago

  @Column({ type: "boolean", default: true })
  activo!: boolean; // Indica si el método de pago está activo y disponible

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date; // Fecha de creación del registro

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date; // Fecha de última actualización del registro
}
