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
    onSave({ id: Date.now(), nombre, precio: parseFloat(precio) });
    setNombre("");
    setPrecio("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Guardar
      </button>
    </form>
  );
}
