import { useState, useEffect } from "react";
import axios from "axios";
import { Mesa } from "@/types";

interface SeleccionMesaProps {
  onMesaSeleccionada: (mesa: Mesa) => void;
}

export default function SeleccionMesa({
  onMesaSeleccionada,
}: SeleccionMesaProps) {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);
  const [comensales, setComensales] = useState<number | null>(null);
  const [confirmado, setConfirmado] = useState(false);

  // Obtener mesas desde la API
  useEffect(() => {
    axios.get("/api/mesas").then((res) => {
      setMesas(res.data.data);
    });
  }, []);

  // Seleccionar una mesa
  const seleccionarMesa = (mesa: Mesa) => {
    setMesaSeleccionada(mesa);
  };

  // Confirmar mesa y guardar en la base de datos
  const confirmarMesa = async () => {
    if (mesaSeleccionada && comensales) {
      const mesaActualizada = {
        ...mesaSeleccionada,
        capacidad: comensales,
        estado: "Ocupada" as "Ocupada",
      };

      // Guardar en la base de datos con un PATCH
      await axios.patch(`/api/mesas/${mesaSeleccionada.id_mesa}`, {
        capacidad: comensales,
        estado: "ocupada",
      });

      onMesaSeleccionada(mesaActualizada);
      setConfirmado(true);
    }
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg">
      {!mesaSeleccionada ? (
        <>
          <h2 className="text-lg font-bold mb-2">Selecciona una Mesa:</h2>
          <div className="grid grid-cols-3 gap-2">
            {mesas.map((mesa) => (
              <button
                key={mesa.id_mesa}
                className="p-2 bg-blue-500 rounded text-white"
                onClick={() => seleccionarMesa(mesa)}
              >
                Mesa {mesa.numero}
              </button>
            ))}
          </div>
        </>
      ) : !confirmado ? (
        <>
          <h2 className="text-lg font-bold mb-2">
            Mesa {mesaSeleccionada.numero}
          </h2>
          <label className="block mb-2">Número de Comensales:</label>
          <input
            type="number"
            className="w-full p-2 mb-4 text-black"
            value={comensales || ""}
            onChange={(e) => setComensales(Number(e.target.value))}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={confirmarMesa}
          >
            OK
          </button>
        </>
      ) : (
        <p className="text-lg font-bold">
          Mesa {mesaSeleccionada.numero} confirmada para {comensales}{" "}
          comensales.
        </p>
      )}
    </div>
  );
}
