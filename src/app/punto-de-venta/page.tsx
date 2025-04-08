"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import HeaderPuntoDeVenta from "@/components/post/HeaderPuntoDeVenta";
import SeleccionMesas from "@/components/post/SeleccionMesa";

export default function PuntoDeVenta() {
  // Estado local para el nombre del mesero
  const [nombreMesero, setNombreMesero] = useState<string | null>(null);

  // Obtenemos el usuario desde el store de autenticación
  const user = useAuthStore((state) => state.user);

  // Al montar la página o cuando el usuario cambia, actualizamos el nombre del mesero
  useEffect(() => {
    if (user?.nombre) {
      setNombreMesero(user.nombre);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <HeaderPuntoDeVenta nombre={nombreMesero || "Mesero"} />
      <div className="p-4">
        {/* Componente que separa Mesas Libres y Mesas Ocupadas */}
        <SeleccionMesas />
      </div>
    </div>
  );
}
