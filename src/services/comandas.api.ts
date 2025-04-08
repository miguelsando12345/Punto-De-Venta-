import axios from "axios";

const API_URL = "/api/comandas"; // Base URL para comandas

/**
 * 📌 Obtener todas las comandas
 */
export const obtenerComandas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo comandas:", error);
    throw error;
  }
};

/**
 * 📌 Obtener comanda por ID
 */
export const obtenerComandaPorID = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo comanda ${id}:`, error);
    throw error;
  }
};

/**
 * 📌 Crear nueva comanda
 */
export const crearComanda = async (comanda: {
  id_mesa: number;
  id_usuario: number;
  id_cliente: number; // si no hay cliente registrado, usar uno genérico
}) => {
  try {
    const response = await axios.post(API_URL, comanda);
    return response.data;
  } catch (error) {
    console.error("Error creando comanda:", error);
    throw error;
  }
};

/**
 * 📌 Actualizar estado de comanda
 */
export const actualizarComanda = async (id: number, datos: object) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando comanda ${id}:`, error);
    throw error;
  }
};

/**
 * 📌 Eliminar comanda
 */
export const eliminarComanda = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando comanda ${id}:`, error);
    throw error;
  }
};
