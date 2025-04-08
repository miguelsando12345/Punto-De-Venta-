// src/components/producto/ProductCard.tsx
"use client";

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
    <div className="border p-4 rounded mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-bold">{product.nombre}</h3>
        <p className="text-gray-600">${product.precio}</p>
      </div>
      <div>
        <button
          onClick={() => onEdit(product)}
          className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
        {/* Usa product.id_producto para eliminar */}
        <button
          onClick={() => onDelete(product.id_producto)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
