import "reflect-metadata"; // Importación de reflect-metadata
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Capturas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  imagen_url: string;

  @CreateDateColumn()
  fecha_creacion: Date;
}
