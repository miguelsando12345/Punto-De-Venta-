"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function PuntoDeVenta() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Aquí asumimos que el rol de usuario se guarda en el estado o el contexto global después de la autenticación.
    const storedRole = localStorage.getItem("userRole"); // Obtener el rol desde localStorage
    if (!storedRole) {
      // Si no hay rol almacenado, redirigir a la página principal
      router.push("/");
    } else {
      setUserRole(storedRole); // Establecemos el rol en el estado
    }
  }, [router]);

  if (userRole === null) {
    return <div>Cargando...</div>; // Mostrar algo mientras se obtiene el rol
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 p-12 rounded-2xl shadow-2xl text-center text-white">
        <h1 className="text-5xl font-bold tracking-wide mb-10 drop-shadow-lg">
          Punto de Venta
        </h1>
        <p className="text-xl mb-6">Bienvenido al sistema de Punto de Venta.</p>

        {/* Agregar aquí la funcionalidad del punto de venta */}
        <div>
          {/* Aquí iría todo el contenido relacionado con la gestión del punto de venta */}
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Volver a la Página Principal
          </button>
        </div>
      </div>
    </div>
  );
}
