import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("capturas") // Nombre de la tabla en la BD
export class Capturas {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  tipoCaptura!: string; // Tipo de captura (por ejemplo: "imagen", "documento")

  @Column({ type: "text", nullable: true })
  descripcion?: string; // Descripción opcional de la captura

  @Column({ type: "varchar", length: 255, nullable: false })
  urlArchivo!: string; // URL o ruta del archivo de la captura

  @Column({ type: "boolean", default: true })
  activo!: boolean; // Indica si la captura está activa

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date; // Fecha de creación del registro

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date; // Fecha de última actualización del registro
}
