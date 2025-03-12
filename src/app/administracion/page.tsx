"use client";
import { Button } from "@/components/ui/button";

export default function Administracion() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-2xl shadow-2xl text-white w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-6 drop-shadow-lg">
          ⚙️ Administración
        </h1>

        {/* Panel de estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold">Ventas del Día</h2>
            <p className="text-3xl font-bold text-green-400">$5,430</p>
          </div>

          <div className="bg-gray-700 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold">Total de Productos</h2>
            <p className="text-3xl font-bold">120</p>
          </div>

          <div className="bg-gray-700 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold">Usuarios Registrados</h2>
            <p className="text-3xl font-bold">15</p>
          </div>
        </div>

        {/* Gestión de Inventario */}
        <div className="mt-6 bg-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            📦 Gestión de Inventario
          </h2>
          <Button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg border-4 border-blue-800 transition-all transform hover:scale-105">
            Agregar Insumo
          </Button>
          <div className="mt-4">
            <p className="text-gray-400">Aquí irá la lista de insumos...</p>
          </div>
        </div>

        {/* Gestión de Usuarios */}
        <div className="mt-6 bg-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            👤 Gestión de Usuarios
          </h2>
          <Button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg border-4 border-blue-800 transition-all transform hover:scale-105">
            Agregar Usuario
          </Button>
          <div className="mt-4">
            <p className="text-gray-400">Aquí irá la lista de usuarios...</p>
          </div>
        </div>

        {/* Registro de Ventas */}
        <div className="mt-6 bg-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">💰 Registro de Ventas</h2>
          <div className="flex space-x-4">
            <input
              type="date"
              className="p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <Button className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg border-4 border-gray-800 transition-all transform hover:scale-105">
              Filtrar
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-gray-400">Aquí irá la tabla de ventas...</p>
          </div>
        </div>

        {/* Gestión de Productos */}
        <div className="mt-6 bg-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            🍽️ Gestión de Productos
          </h2>
          <Button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg border-4 border-blue-800 transition-all transform hover:scale-105">
            Agregar Producto
          </Button>
          <div className="mt-4">
            <p className="text-gray-400">Aquí irá la lista de productos...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
