import { useEffect, useState } from "react";
import { obtenerProductos } from "@/services/productos.api";
import { Producto } from "@/types";

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return { productos, loading, cargarProductos };
};
