import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("productos_insumo") // Nombre de la tabla en la BD
export class ProductosInsumo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  nombre!: string;

  @Column({ type: "text", nullable: true })
  descripcion?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  costo!: number;

  @Column({ type: "int", nullable: false })
  cantidadDisponible!: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  categoria!: string;

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
}
