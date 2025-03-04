import React from "react";

interface DeleteComandaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteComandaModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteComandaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <p className="mb-4">¿Seguro que deseas eliminar esta comanda?</p>
        <button onClick={onConfirm} className="bg-red-500 text-white p-2 mr-2">
          Eliminar
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white p-2">
          Cancelar
        </button>
      </div>
    </div>
  );
}
