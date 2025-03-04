import { useState } from "react";
import { Cliente } from "@/types";

interface ClienteFormProps {
  onSave: (cliente: Cliente) => void;
}

export default function ClienteForm({ onSave }: ClienteFormProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ id: Date.now(), nombre, telefono });
    setNombre("");
    setTelefono("");
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
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Guardar
      </button>
    </form>
  );
}
