// services/categoria-productos.ts
import axios from "axios";
import { CategoriaProducto } from "@/types";

export const getCategorias = async (): Promise<CategoriaProducto[]> => {
  try {
    const response = await axios.get("/api/categoria-productos");

    if (response.status !== 200) {
      throw new Error("Error al obtener categorías de productos");
    }

    return response.data.data as CategoriaProducto[];
  } catch (error: any) {
    console.error("Error en obtener categorías:", error);
    throw error; // Relanza el error para manejarlo en el componente
  }
};
