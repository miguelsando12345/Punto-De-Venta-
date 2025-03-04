import React from "react";
import { Producto } from "@/types";

interface ProductCardProps {
  product: Producto;
  onEdit: (product: Producto) => void;
  onDelete: (id: number) => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">{product.nombre}</h2>
      <p className="text-sm text-gray-600">Precio: ${product.precio}</p>
      <div className="flex justify-between mt-2">
        <button onClick={() => onEdit(product)} className="text-blue-500">
          Editar
        </button>
        <button onClick={() => onDelete(product.id)} className="text-red-500">
          Eliminar
        </button>
      </div>
    </div>
  );
}
