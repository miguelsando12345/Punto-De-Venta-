import axios from "axios";

const API_URL = "/api/productos"; // Base URL para productos

/**
 * 📌 Obtener todos los productos
 */
export const obtenerProductos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw error;
  }
};

/**
 * 📌 Obtener un producto por ID
 */
export const obtenerProductoPorID = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo producto ${id}:`, error);
    throw error;
  }
};

/**
 * 📌 Crear un nuevo producto
 */
export const crearProducto = async (producto: {
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria_id: number;
  disponible: boolean;
}) => {
  try {
    const response = await axios.post(API_URL, producto);
    return response.data;
  } catch (error) {
    console.error("Error creando producto:", error);
    throw error;
  }
};

/**
 * 📌 Actualizar un producto
 */
export const actualizarProducto = async (id: number, datos: object) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando producto ${id}:`, error);
    throw error;
  }
};

/**
 * 📌 Eliminar un producto
 */
export const eliminarProducto = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando producto ${id}:`, error);
    throw error;
  }
};
