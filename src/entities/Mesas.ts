import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("mesas") // Nombre de la tabla en la BD
export class Mesas {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  nombre!: string; // Nombre o número de la mesa

  @Column({ type: "varchar", length: 255, nullable: true })
  descripcion?: string; // Descripción opcional de la mesa (por ejemplo, ubicación)

  @Column({ type: "int", nullable: false })
  capacidad!: number; // Capacidad de personas que puede acomodar la mesa

  @Column({ type: "boolean", default: true })
  disponible!: boolean; // Indica si la mesa está disponible o reservada

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date; // Fecha de creación del registro

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date; // Fecha de última actualización del registro
}
