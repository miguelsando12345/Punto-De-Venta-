import axios from "axios";

const API_URL = "/api/categorias"; // Base URL para categorías de productos

/**
 * 📌 Obtener todas las categorías
 */
export const obtenerCategorias = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo categorías:", error);
    throw error;
  }
};

/**
 * 📌 Obtener una categoría por ID
 */
export const obtenerCategoriaPorID = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo categoría ${id}:`, error);
    throw error;
  }
};

/**
 * 📌 Crear nueva categoría
 */
export const crearCategoria = async (categoria: { nombre: string }) => {
  try {
    const response = await axios.post(API_URL, categoria);
    return response.data;
  } catch (error) {
    console.error("Error creando categoría:", error);
    throw error;
  }
};

/**
 * 📌 Actualizar categoría
 */
export const actualizarCategoria = async (id: number, datos: object) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando categoría ${id}:`, error);
    throw error;
  }
};

/**
 * 📌 Eliminar categoría
 */
export const eliminarCategoria = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando categoría ${id}:`, error);
    throw error;
  }
};
