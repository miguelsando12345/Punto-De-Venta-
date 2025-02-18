// src/entities/Usuario.ts
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Comandas } from "./Comandas";
import { VentasDiarias } from "./Ventasdiarias";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  contraseña: string;

  @Column()
  rol: string;

  @OneToMany(() => Comandas, (comanda) => comanda.usuario)
  comandas: Comandas[];

  @OneToMany(() => VentasDiarias, (venta) => venta.usuario)
  ventasDiarias: VentasDiarias[];
}
