import axios from "axios";
import { Mesa } from "@/types";

const API_URL = "/api/mesas";

export const getMesas = async (): Promise<{
  success: boolean;
  data: Mesa[];
}> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo mesas", error);
    throw error;
  }
};

export const seleccionarMesa = async (
  idMesa: number,
  estado: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.put(`${API_URL}/${idMesa}`, { estado });
    return response.data;
  } catch (error) {
    console.error("Error seleccionando mesa", error);
    throw error;
  }
};
