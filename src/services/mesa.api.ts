import axios from "axios";

const API_URL = "/api/mesas"; // Base URL para las mesas

/**
 * 📌 Obtener todas las mesas
 */
export const obtenerMesas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo mesas:", error);
    throw error;
  }
};

/**
 * 📌 Obtener una mesa por ID
 */
export const obtenerMesaPorID = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo la mesa ${id}:`, error);
    throw error;
  }
};

/**
 * 📌 Crear una nueva mesa
 */
export const crearMesa = async (mesa: {
  numero: number;
  capacidad: number;
  estado: string;
}) => {
  try {
    const response = await axios.post(API_URL, mesa);
    return response.data;
  } catch (error) {
    console.error("Error creando mesa:", error);
    throw error;
  }
};

/**
 * 📌 Actualizar una mesa por ID
 */
export const actualizarMesa = async (id: number, datosActualizados: object) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando la mesa ${id}:`, error);
    throw error;
  }
};

/**
 * 📌 Eliminar una mesa por ID
 */
export const eliminarMesa = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando la mesa ${id}:`, error);
    throw error;
  }
};
