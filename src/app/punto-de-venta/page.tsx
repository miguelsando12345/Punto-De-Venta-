"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import useMesaStore from "@/stores/useMesaStore"; // Importamos la tienda de mesas
import HeaderPuntoDeVenta from "@/components/post/HeaderPuntoDeVenta";
import SeleccionMesa from "@/components/post/SeleccionMesa";
import { Mesa } from "@/types";

export default function PuntoDeVenta() {
  // Estado local para el nombre del mesero
  const [nombreMesero, setNombreMesero] = useState<string | null>(null);

  // Obtenemos el usuario desde el store de autenticación
  const user = useAuthStore((state) => state.user);

  // Usamos el store de mesas para manejar la mesa seleccionada globalmente
  const { mesaSeleccionada, setMesaSeleccionada } = useMesaStore();

  // Efecto que se ejecuta cuando el usuario cambia o entra en la página
  useEffect(() => {
    if (user?.nombre) {
      setNombreMesero(user.nombre); // Establecemos el nombre del mesero desde el usuario
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Pasamos el nombre del mesero al componente Header */}
      <HeaderPuntoDeVenta nombre={nombreMesero || "Mesero"} />

      <div className="p-4">
        {/* Componente para seleccionar la mesa */}
        <SeleccionMesa onMesaSeleccionada={setMesaSeleccionada} />

        {/* Mostrar mesa seleccionada */}
        {mesaSeleccionada && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h2 className="text-lg font-bold">Mesa Seleccionada:</h2>
            <p>Número: {mesaSeleccionada.numero}</p>
            <p>Capacidad: {mesaSeleccionada.capacidad} personas</p>
            <p>Estado: {mesaSeleccionada.estado}</p>
          </div>
        )}
      </div>
    </div>
  );
}
