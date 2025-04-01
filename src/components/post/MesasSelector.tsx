"use client";

import React, { useEffect, useState } from "react";
import { getMesas } from "@/services/mesa.api";
import { Mesa, Comanda } from "@/types";
import { crearComanda } from "@/services/comanda.api";

interface MesasSelectorProps {
  onComandaCreada: (nuevaComanda: Comanda) => void;
}

const MesasSelector: React.FC<MesasSelectorProps> = ({ onComandaCreada }) => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);
  const [adultos, setAdultos] = useState<number>(1);
  const [niños, setNiños] = useState<number>(0);

  useEffect(() => {
    async function fetchMesas() {
      try {
        const data = await getMesas();
        if (data.success) setMesas(data.data);
      } catch (error) {
        console.error("Error cargando mesas", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMesas();
  }, []);

  const handleSelect = (mesa: Mesa) => {
    setMesaSeleccionada(mesa);
    setAdultos(1); // Reiniciar valores por defecto
    setNiños(0);
  };

  const handleConfirmarComanda = async () => {
    if (mesaSeleccionada) {
      const nuevaComanda: Omit<Comanda, "id_comanda"> = {
        id_mesa: mesaSeleccionada.id_mesa,
        id_usuario: 1, // Asumiendo que el id de usuario es 1, ajusta según sea necesario
        id_cliente: 1, // Asumiendo que el id del cliente es 1, ajusta según sea necesario
        estado: "Pendiente",
        detalle_comanda: [],
      };

      try {
        const comandaCreada = await crearComanda(nuevaComanda);
        onComandaCreada(comandaCreada); // Pasar la nueva comanda al componente padre
        alert("Comanda creada con éxito");
      } catch (error) {
        console.error("Error al crear la comanda", error);
        alert("Hubo un error al crear la comanda");
      }
    }
  };

  if (loading) return <p className="text-center text-xl">Cargando mesas...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Selecciona una Mesa
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {mesas.map((mesa) => (
          <button
            key={mesa.id_mesa}
            className={`p-6 rounded-2xl text-lg font-semibold text-white shadow-lg border-4 transition-all ${
              mesa.estado === "Libre"
                ? "bg-green-600 border-green-400 hover:bg-green-700"
                : "bg-gray-500 border-gray-400 cursor-not-allowed"
            }`}
            onClick={() => mesa.estado === "Libre" && handleSelect(mesa)}
            disabled={mesa.estado !== "Libre"}
          >
            Mesa {mesa.numero}
          </button>
        ))}
      </div>

      {mesaSeleccionada && (
        <div className="mt-6 p-6 bg-gray-800 text-white rounded-2xl shadow-lg border-4 border-gray-600">
          <h3 className="text-xl font-semibold">
            Mesa {mesaSeleccionada.numero} Seleccionada
          </h3>

          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-lg">Adultos:</label>
              <input
                type="number"
                min="1"
                value={adultos}
                onChange={(e) => setAdultos(Number(e.target.value))}
                className="w-full p-3 rounded-lg border-2 border-gray-500 text-black text-lg"
              />
            </div>

            <div>
              <label className="block text-lg">Niños:</label>
              <input
                type="number"
                min="0"
                value={niños}
                onChange={(e) => setNiños(Number(e.target.value))}
                className="w-full p-3 rounded-lg border-2 border-gray-500 text-black text-lg"
              />
            </div>

            <button
              onClick={handleConfirmarComanda}
              className="mt-4 p-4 bg-blue-500 hover:bg-blue-600 rounded-2xl w-full text-lg font-semibold"
            >
              Confirmar Mesa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MesasSelector;
