import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Capturas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  urlImagen: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fechaCaptura: Date;
}
