import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("categoria_productos") // Nombre de la tabla en la BD
@Unique(["nombre"]) // Asegura que el nombre de la categoría sea único
export class CategoriaProductos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  nombre!: string; // Nombre de la categoría

  @Column({ type: "text", nullable: true })
  descripcion?: string; // Descripción opcional de la categoría

  @Column({ type: "boolean", default: true })
  activo!: boolean; // Indica si la categoría está activa

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date; // Fecha de creación del registro

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date; // Fecha de última actualización del registro
}
