"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mesa } from "@/types"; // Ajusta la ruta si tu archivo de tipos es distinto

export default function MesasOcupadas() {
  const [mesasOcupadas, setMesasOcupadas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const res = await axios.get("/api/mesas");
        if (res.data.success && Array.isArray(res.data.data)) {
          // Filtrar para obtener solo las mesas ocupadas
          const ocupadas = res.data.data.filter(
            (mesa: Mesa) => mesa.estado === "Ocupada"
          );
          setMesasOcupadas(ocupadas);
        } else {
          setError(res.data.message || "Error al obtener mesas");
        }
      } catch (err) {
        console.error("Error al obtener mesas:", err);
        setError("Ocurrió un error al obtener las mesas");
      } finally {
        setLoading(false);
      }
    };
    fetchMesas();
  }, []);

  if (loading) {
    return <p className="text-white">Cargando mesas ocupadas...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (mesasOcupadas.length === 0) {
    return <p className="text-white">No hay mesas ocupadas</p>;
  }

  return (
    <div className="bg-gray-700 p-4 rounded">
      <h2 className="text-xl font-bold mb-4 text-white">Mesas Ocupadas</h2>
      <div className="grid grid-cols-3 gap-2">
        {mesasOcupadas.map((mesa) => (
          <div key={mesa.id_mesa} className="p-2 bg-red-500 rounded text-white">
            <p>Mesa {mesa.numero}</p>
            <p>Capacidad: {mesa.capacidad}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
