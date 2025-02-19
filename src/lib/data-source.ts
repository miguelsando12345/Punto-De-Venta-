import "reflect-metadata";
import { DataSource } from "typeorm";

// Importar todas las entidades
import { Capturas } from "@/entities/Capturas";
import { CategoriaProductos } from "@/entities/CategoriaProductos";
import { Clientes } from "@/entities/Clientes";
import { Comandas } from "@/entities/Comandas";
import { DetalleComanda } from "@/entities/DetalleComanda";
import { GastosDiarios } from "@/entities/GastosDiarios";
import { Inventario } from "@/entities/Inventario";
import { Mesas } from "@/entities/Mesas";
import { MetodosPago } from "@/entities/MetodosPago";
import { Pagos } from "@/entities/Pagos";
import { Producto } from "@/entities/Producto";
import { ProductosInsumo } from "@/entities/ProductosInsumo";
import { Usuario } from "@/entities/Usuario";
import { VentasDiarias } from "@/entities/VentasDiarias";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Capturas,
    CategoriaProductos,
    Clientes,
    Comandas,
    DetalleComanda,
    GastosDiarios,
    Inventario,
    Mesas,
    MetodosPago,
    Pagos,
    Producto,
    ProductosInsumo,
    Usuario,
    VentasDiarias,
  ],
});
