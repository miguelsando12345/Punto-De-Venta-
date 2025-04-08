import { useEffect, useState } from "react";
import { obtenerMesas } from "@/services/mesas.api";
import { Mesa } from "@/types";

export const useMesas = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarMesas = async () => {
    try {
      setLoading(true);
      const data = await obtenerMesas();
      setMesas(data);
    } catch (error) {
      console.error("Error al cargar mesas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMesas();
  }, []);

  return { mesas, loading, cargarMesas };
};
