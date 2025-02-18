// src/entities/VentasDiarias.ts
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class VentasDiarias {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column()
  fecha: string;

  @Column("decimal")
  totalVentas: number;  // Total de ventas en el día
}
