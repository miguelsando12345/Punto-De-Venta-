"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Mesa } from "@/types";

export default function SeleccionMesas() {
  // Estado para las mesas libres y ocupadas
  const [mesasLibres, setMesasLibres] = useState<Mesa[]>([]);
  const [mesasOcupadas, setMesasOcupadas] = useState<Mesa[]>([]);

  // Para manejo de errores y carga
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Guardamos la cantidad de comensales ingresada para cada mesa libre
  // { id_mesa: comensales }
  const [selectedCapacity, setSelectedCapacity] = useState<{
    [key: number]: number;
  }>({});

  const router = useRouter();

  // 1. Al montar el componente, obtenemos todas las mesas
  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const res = await axios.get("/api/mesas");
        if (res.data.success) {
          const allMesas: Mesa[] = res.data.data;
          // Dividimos según su estado en la DB
          setMesasLibres(allMesas.filter((m) => m.estado === "Libre"));
          setMesasOcupadas(allMesas.filter((m) => m.estado === "Ocupada"));
        } else {
          setError(res.data.message || "Error al obtener mesas");
        }
      } catch (err) {
        console.error("Error obteniendo mesas:", err);
        setError("Ocurrió un error al obtener las mesas");
      } finally {
        setLoading(false);
      }
    };

    fetchMesas();
  }, []);

  // 2. Manejar la edición del número de comensales para una mesa
  const handleChangeCapacity = (id_mesa: number, capacity: number) => {
    setSelectedCapacity((prev) => ({
      ...prev,
      [id_mesa]: capacity,
    }));
  };

  // 3. Confirmar una mesa libre (PATCH) y moverla a "Ocupadas"
  const confirmarMesa = async (mesa: Mesa) => {
    const capacity = selectedCapacity[mesa.id_mesa] ?? 0;
    if (capacity < 1) {
      alert("Ingrese un número válido de comensales.");
      return;
    }

    try {
      // Actualizamos en la DB, marcando la mesa como "Ocupada"
      await axios.patch(`/api/mesas/${mesa.id_mesa}`, {
        capacidad: capacity,
        estado: "Ocupada",
      });

      // Quitamos la mesa de "mesasLibres"
      setMesasLibres((prev) => prev.filter((m) => m.id_mesa !== mesa.id_mesa));
      // Añadimos la mesa a "mesasOcupadas", actualizando su capacidad
      setMesasOcupadas((prev) => [
        ...prev,
        { ...mesa, capacidad: capacity, estado: "Ocupada" },
      ]);

      // Limpiamos el valor de comensales ingresado para esa mesa
      setSelectedCapacity((prev) => {
        const newState = { ...prev };
        delete newState[mesa.id_mesa];
        return newState;
      });
    } catch (err) {
      console.error("Error al confirmar la mesa:", err);
      alert("Ocurrió un error al confirmar la mesa.");
    }
  };

  // 4. Navegar para “Añadir Productos” a la mesa ocupada
  const agregarProductos = (mesa: Mesa) => {
    // Ejemplo: redirigimos a la URL con query param
    router.push(`/punto-de-venta/productos?mesa=${mesa.id_mesa}`);
  };

  // Manejo de carga/errores
  if (loading) return <p className="p-4 text-white">Cargando mesas...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Columna Izquierda: Mesas Libres */}
      <div className="w-full md:w-1/2 bg-gray-700 p-4 rounded">
        <h2 className="text-xl font-bold mb-4 text-white">Mesas Libres</h2>
        {mesasLibres.length === 0 ? (
          <p className="text-gray-300">No hay mesas libres.</p>
        ) : (
          mesasLibres.map((mesa) => (
            <div key={mesa.id_mesa} className="bg-gray-800 p-3 rounded mb-4">
              <h3 className="text-lg font-bold text-white">
                Mesa {mesa.numero}
              </h3>
              <label className="block mb-2 text-white">Comensales:</label>
              <input
                type="number"
                className="p-2 text-black w-full mb-2 rounded"
                value={selectedCapacity[mesa.id_mesa] ?? ""}
                onChange={(e) =>
                  handleChangeCapacity(mesa.id_mesa, Number(e.target.value))
                }
              />
              <button
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                onClick={() => confirmarMesa(mesa)}
              >
                Confirmar
              </button>
            </div>
          ))
        )}
      </div>

      {/* Columna Derecha: Mesas Ocupadas */}
      <div className="w-full md:w-1/2 bg-gray-700 p-4 rounded">
        <h2 className="text-xl font-bold mb-4 text-white">Mesas Ocupadas</h2>
        {mesasOcupadas.length === 0 ? (
          <p className="text-gray-300">No hay mesas ocupadas.</p>
        ) : (
          mesasOcupadas.map((mesa) => (
            <div key={mesa.id_mesa} className="bg-gray-800 p-3 rounded mb-4">
              <h3 className="text-lg font-bold text-white">
                Mesa {mesa.numero}
              </h3>
              <p className="text-white mb-2">Comensales: {mesa.capacidad}</p>
              <button
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded"
                onClick={() => agregarProductos(mesa)}
              >
                Añadir Productos
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
