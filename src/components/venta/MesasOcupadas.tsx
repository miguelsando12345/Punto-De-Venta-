"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { AddProductsModal } from "./AddProductsModal"; // Ajusta la ruta si es necesario
import { Producto } from "@/types";

interface MesaData {
  id_mesa: number;
  numero: number;
  capacidad: number;
  estado: string;
  comensales: number;
}

export default function MesasOcupadas() {
  const [mesasOcupadas, setMesasOcupadas] = useState<MesaData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState<number | null>(null);

  // Obtener las mesas ocupadas desde el endpoint /api/mesas
  useEffect(() => {
    const fetchMesasOcupadas = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/mesas");
        if (res.data.success) {
          // Filtra las mesas cuyo estado sea "Ocupada"
          const ocupadas = res.data.data.filter(
            (mesa: MesaData) => mesa.estado === "Ocupada"
          );
          setMesasOcupadas(ocupadas);
        } else {
          setError(res.data.message || "Error al obtener mesas");
        }
      } catch (err) {
        console.error("Error fetching mesas:", err);
        setError("Ocurrió un error al obtener mesas");
      } finally {
        setLoading(false);
      }
    };
    fetchMesasOcupadas();
  }, []);

  const handleAddProducts = (id_mesa: number) => {
    setSelectedMesa(id_mesa);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMesa(null);
  };

  // Al confirmar, se obtienen los productos seleccionados para la mesa
  const handleConfirmProducts = (selectedProducts: Producto[]) => {
    console.log(
      "Productos seleccionados para la mesa:",
      selectedMesa,
      selectedProducts
    );
    // Aquí podrías enviar el array a tu API para crear una comanda, etc.
    handleCloseModal();
  };

  if (loading)
    return <p className="p-4 text-white">Cargando mesas ocupadas...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="bg-gray-700 p-4 rounded w-full">
      <h2 className="text-xl font-bold mb-4 text-white">Mesas Ocupadas</h2>
      <div className="space-y-4">
        {mesasOcupadas.map((mesa) => (
          <div key={mesa.id_mesa} className="bg-gray-800 p-3 rounded">
            <h3 className="text-lg font-bold text-white">Mesa {mesa.numero}</h3>
            <p className="text-white">Comensales: {mesa.comensales}</p>
            <Button
              variant="default"
              className="mt-2 bg-purple-500"
              onClick={() => handleAddProducts(mesa.id_mesa)}
            >
              Añadir Productos
            </Button>
          </div>
        ))}
      </div>

      {/* Modal para añadir productos */}
      <AddProductsModal
        mesaId={selectedMesa ?? 0}
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmProducts}
      />
    </div>
  );
}
