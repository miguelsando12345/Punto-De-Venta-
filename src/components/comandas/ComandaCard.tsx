import React from "react";
import { Comanda } from "@/types";

interface ComandaCardProps {
  comanda: Comanda;
  onEdit: (comanda: Comanda) => void;
  onDelete: (id: number) => void;
}

export default function ComandaCard({
  comanda,
  onEdit,
  onDelete,
}: ComandaCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">Mesa {comanda.mesa}</h2>
      <p className="text-sm text-gray-600">Total: ${comanda.total}</p>
      <div className="flex justify-between mt-2">
        <button onClick={() => onEdit(comanda)} className="text-blue-500">
          Editar
        </button>
        <button onClick={() => onDelete(comanda.id)} className="text-red-500">
          Eliminar
        </button>
      </div>
    </div>
  );
}
