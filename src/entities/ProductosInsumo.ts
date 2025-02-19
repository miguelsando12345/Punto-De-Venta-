import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ProductosInsumo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
