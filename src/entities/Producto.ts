import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CategoriaProductos } from "./CategoriaProductos";
import { DetalleComanda } from "./DetalleComanda";

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

  // Agregar esta línea para la relación con DetalleComanda
  @OneToMany(() => DetalleComanda, (detalle) => detalle.producto)
  detalles: DetalleComanda[];
}
