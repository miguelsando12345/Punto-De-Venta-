import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CategoriaProductos } from "./CategoriaProductos";

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column("decimal", { precision: 10, scale: 2 })
  precio: number;

  @ManyToOne(() => CategoriaProductos, (categoria) => categoria.productos)
  categoria: CategoriaProductos;
}
