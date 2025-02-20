import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("comandas") // Nombre de la tabla en la BD
export class Comandas {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: false })
  mesaId!: number; // ID de la mesa asociada a la comanda

  @Column({ type: "varchar", length: 150, nullable: false })
  estado!: string; // Estado de la comanda (ej: "Pendiente", "En preparación", "Servido")

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  total!: number; // Monto total de la comanda

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha!: Date; // Fecha de creación de la comanda

  @Column({ type: "varchar", length: 255, nullable: true })
  notas?: string; // Notas o comentarios adicionales para la comanda

  @Column({ type: "boolean", default: false })
  pagado!: boolean; // Indica si la comanda ha sido pagada

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date; // Fecha de creación del registro

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date; // Fecha de última actualización del registro
}
