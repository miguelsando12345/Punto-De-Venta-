// src/components/producto/ProductForm.tsx
"use client";

import { useState } from "react";
import { Producto } from "@/types";

interface ProductFormProps {
  onSave: (product: Producto) => void;
}

export default function ProductForm({ onSave }: ProductFormProps) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Se utiliza Date.now() para generar un id temporal, asignado a id_producto
    const nuevoProducto: Producto = {
      id_producto: Date.now(),
      nombre,
      precio: parseFloat(precio),
      categoria_id: 0, // Valor por defecto (puedes cambiarlo si es necesario)
      disponible: true, // Valor por defecto: producto disponible
    };
    onSave(nuevoProducto);
    setNombre("");
    setPrecio("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-gray-700 p-4 rounded">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 mr-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className="border p-2 mr-2 rounded"
        step="0.01"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Guardar
      </button>
    </form>
  );
}
