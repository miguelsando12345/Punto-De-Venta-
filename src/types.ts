export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria_id: number; // Relación con la categoría
}

export interface CategoriaProducto {
  id: number;
  nombre: string;
  productos: Producto[]; // Relación con los productos de la categoría
}

export interface DetalleComanda {
  id_detalle: number;
  id_comanda: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  producto: Producto; // Relación con Producto
}

export interface Comanda {
  id_comanda: number;
  id_mesa: number;
  id_usuario: number;
  id_cliente: number;
  estado: "Pendiente" | "Preparando" | "Lista" | "Entregado" | "Cancelado";
  detalle_comanda: DetalleComanda[]; // Lista de productos en la comanda
}

export interface Mesa {
  id_mesa: number; // Identificador único de la mesa
  numero: number; // Número de la mesa
  capacidad: number; // Capacidad máxima de la mesa
  estado: "Libre" | "Ocupada" | "Reservada"; // Estado de la mesa
  comandas?: Comanda[]; // Relación con las comandas (opcional)
  cantidad_comensales?: number; // Cantidad de comensales asignados (opcional)
}
