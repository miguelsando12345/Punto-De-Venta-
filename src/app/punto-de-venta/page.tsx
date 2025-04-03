"use client";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import HeaderPuntoDeVenta from "@/components/post/HeaderPuntoDeVenta";

export default function PuntoDeVenta() {
  const [nombreMesero, setNombreMesero] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setNombreMesero(user.name); // Establecemos el nombre del mesero
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <HeaderPuntoDeVenta nombre={nombreMesero} />
      {/* Aquí puedes agregar más contenido relacionado con el punto de venta */}
      <div className="p-4">
        <h2>Bienvenido al punto de venta</h2>
        {/* Mostrar productos, mesas, etc. */}
      </div>
    </div>
  );
}
