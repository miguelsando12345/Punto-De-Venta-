// src/components/producto/ProductsList.tsx
"use client";

import { useState } from "react";
import ProductCard from "@/components/producto/ProductCard";
import DeleteProductModal from "@/components/producto/DeleteProductModal";
import { Producto } from "@/types";

export default function ProductsList() {
  // Productos de ejemplo que ahora incluyen categoria_id y disponible
  const [productos, setProductos] = useState<Producto[]>([
    {
      id_producto: 1,
      nombre: "Producto 1",
      precio: 100,
      categoria_id: 0,
      disponible: true,
    },
    {
      id_producto: 2,
      nombre: "Producto 2",
      precio: 200,
      categoria_id: 0,
      disponible: true,
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | undefined>(
    undefined
  );

  const handleDelete = () => {
    if (productToDelete !== undefined) {
      setProductos(productos.filter((p) => p.id_producto !== productToDelete));
      setModalOpen(false);
      setProductToDelete(undefined);
    }
  };

  return (
    <div>
      {productos.map((product) => (
        <ProductCard
          key={product.id_producto}
          product={product}
          onEdit={() => {}}
          onDelete={(id) => {
            setProductToDelete(id);
            setModalOpen(true);
          }}
        />
      ))}
      <DeleteProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
