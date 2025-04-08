// src/app/producto/page.tsx
"use client";

import ProductsList from "@/components/producto/ProductsList";
import ProductForm from "@/components/producto/ProductForm";
import { Producto } from "@/types";

export default function ProductsPage() {
  const handleSave = (product: Producto) => {
    console.log("Producto guardado:", product);
    // Aquí podrías actualizar la lista o realizar una petición POST a tu API
  };

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      <ProductForm onSave={handleSave} />
      <ProductsList />
    </div>
  );
}
