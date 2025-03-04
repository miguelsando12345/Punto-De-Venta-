export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}
export interface Comanda {
  id: number;
  mesa: number;
  total: number;
}
// src/types.ts
export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
}
