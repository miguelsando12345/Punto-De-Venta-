"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      {/* Fondo gris oscuro para mejorar la visibilidad */}
      <div className="bg-gray-900 bg-opacity-90 p-12 rounded-2xl shadow-2xl text-center">
        <h1 className="text-5xl font-bold text-white tracking-wide mb-10 drop-shadow-lg">
          Restaurante POS
        </h1>

        {/* Botones centrados */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Button
            className="w-52 h-52 text-2xl font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xl border-4 border-blue-800 transition-all transform hover:scale-105"
            onClick={() => handleNavigate("/punto-de-venta")}
          >
            Punto de Venta
          </Button>

          <Button
            className="w-52 h-52 text-2xl font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-2xl border-4 border-green-800 transition-all transform hover:scale-105"
            onClick={() => handleNavigate("/caja")}
          >
            Caja
          </Button>

          <Button
            className="w-52 h-52 text-2xl font-semibold bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-2xl border-4 border-gray-800 transition-all transform hover:scale-105"
            onClick={() => handleNavigate("/administracion")}
          >
            ⚙️ Administración
          </Button>
        </div>
      </div>
    </div>
  );
}
