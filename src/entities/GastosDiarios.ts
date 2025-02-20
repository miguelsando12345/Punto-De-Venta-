import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("gastos_diarios") // Nombre de la tabla en la BD
export class GastosDiarios {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  descripcion!: string; // Descripción del gasto (por ejemplo, alquiler, suministros)

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  monto!: number; // Monto total del gasto

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha!: Date; // Fecha en que se registró el gasto

  @Column({ type: "varchar", length: 50, nullable: false })
  categoria!: string; // Categoría del gasto (por ejemplo, mantenimiento, sueldos, servicios)

  @Column({ type: "boolean", default: true })
  procesado!: boolean; // Indica si el gasto fue procesado correctamente

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  actualizadoEn!: Date; // Fecha de última actualización del registro
}
