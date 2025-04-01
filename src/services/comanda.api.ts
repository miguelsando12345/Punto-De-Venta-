import axios from "axios";
import { Comanda, DetalleComanda } from "@/types";

const API_URL = "/api/comandas"; // Ajusta la URL según la ruta de tu API

// Crear una nueva comanda
export const crearComanda = async (comanda: Omit<Comanda, "id_comanda">) => {
  try {
    const response = await axios.post(`${API_URL}`, comanda);
    return response.data;
  } catch (error) {
    console.error("Error al crear la comanda:", error);
    throw new Error("No se pudo crear la comanda. Intenta de nuevo.");
  }
};

// Agregar productos a una comanda existente
export const agregarProductoAComanda = async (detalle: DetalleComanda) => {
  try {
    const response = await axios.post(`${API_URL}/detalle`, detalle);
    return response.data;
  } catch (error) {
    console.error("Error al agregar el producto a la comanda:", error);
    throw new Error(
      "No se pudo agregar el producto a la comanda. Intenta de nuevo."
    );
  }
};
