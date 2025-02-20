import "reflect-metadata"; // IMPORTA ESTO PRIMERO
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ventas_diarias") // Nombre de la tabla en la BD
export class VentasDiarias {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date", nullable: false })
  fecha!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalVentas!: number;

  @Column({ type: "int", nullable: false })
  totalProductosVendidos!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalDescuentos!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalImpuestos!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalNeto!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creadoEn!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  actualizadoEn!: Date;
}
