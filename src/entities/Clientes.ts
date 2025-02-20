import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("clientes") // Nombre de la tabla en la BD
@Unique(["correo"]) // Asegura que no haya duplicados en el campo de correo
export class Clientes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  nombre!: string; // Nombre completo del cliente

  @Column({ type: "varchar", length: 150, nullable: false })
  apellido!: string; // Apellido del cliente

  @Column({ type: "varchar", length: 255, nullable: false })
  correo!: string; // Correo electrónico del cliente (único)

  @Column({ type: "varchar", length: 15, nullable: true })
  telefono?: string; // Teléfono de contacto del cliente

  @Column({ type: "varchar", length: 255, nullable: true })
  direccion?: string; // Dirección del cliente

  @Column({ type: "boolean", default: true })
  activo!: boolean; // Indica si el cliente está activo o inactivo

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date; // Fecha de creación del registro

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date; // Fecha de última actualización del registro
}
