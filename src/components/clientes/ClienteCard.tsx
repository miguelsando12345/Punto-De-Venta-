import React from "react";
import { Cliente } from "@/types";

interface ClienteCardProps {
  cliente: Cliente;
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: number) => void;
}

export default function ClienteCard({
  cliente,
  onEdit,
  onDelete,
}: ClienteCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">{cliente.nombre}</h2>
      <p className="text-sm text-gray-600">Teléfono: {cliente.telefono}</p>
      <div className="flex justify-between mt-2">
        <button onClick={() => onEdit(cliente)} className="text-blue-500">
          Editar
        </button>
        <button onClick={() => onDelete(cliente.id)} className="text-red-500">
          Eliminar
        </button>
      </div>
    </div>
  );
}
