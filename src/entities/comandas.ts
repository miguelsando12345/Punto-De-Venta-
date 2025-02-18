// src/entities/Comandas.ts
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Comandas {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column()
  cliente: string;

  @Column()
  fecha: string;

  @Column("decimal")
  total: number;  // Total de la comanda

  @Column("json")
  items: object;  // Lista de productos/items de la comanda
}
