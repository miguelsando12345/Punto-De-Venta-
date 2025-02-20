import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("usuarios") // Nombre de la tabla en la BD
@Unique(["email"]) // Evita duplicados en el email del usuario
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  nombre!: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  direccion?: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  telefono!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  imagenUrl?: string;

  @Column({ type: "boolean", default: true })
  activo!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date;

  @Column({ type: "varchar", length: 255, nullable: false })
  password!: string; // Agregar la propiedad password
}
