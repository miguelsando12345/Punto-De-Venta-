import prisma from "@/lib/prisma";

/**
 * 📌 Obtener todos los gastos diarios
 */
export async function obtenerGastosDiarios() {
  try {
    const gastos = await prisma.gastosDiarios.findMany();
    return { success: true, data: gastos };
  } catch (error) {
    console.error("Error en obtenerGastosDiarios:", error);
    return { success: false, message: "Error obteniendo gastos diarios" };
  }
}

/**
 * 📌 Obtener un gasto diario por ID
 */
export async function obtenerGastoDiarioPorId(id: number) {
  try {
    const gasto = await prisma.gastosDiarios.findUnique({
      where: { id_gasto: id },
    });

    if (!gasto) {
      return { success: false, message: "Gasto no encontrado" };
    }

    return { success: true, data: gasto };
  } catch (error) {
    console.error("Error en obtenerGastoDiarioPorId:", error);
    return { success: false, message: "Error obteniendo gasto diario" };
  }
}

/**
 * 📌 Crear un nuevo gasto diario
 */
export async function crearGastoDiario(data: {
  fecha: Date;
  descripcion: string;
  monto: number;
}) {
  try {
    const { fecha, descripcion, monto } = data;

    if (!fecha || !descripcion || !monto) {
      return { success: false, message: "Todos los campos son obligatorios" };
    }

    const nuevoGasto = await prisma.gastosDiarios.create({
      data: { fecha, descripcion, monto },
    });

    return { success: true, data: nuevoGasto };
  } catch (error) {
    console.error("Error en crearGastoDiario:", error);
    return { success: false, message: "Error creando gasto diario" };
  }
}

/**
 * 📌 Actualizar un gasto diario por ID
 */
export async function actualizarGastoDiario(
  id: number,
  data: { fecha?: Date; descripcion?: string; monto?: number }
) {
  try {
    const gastoActualizado = await prisma.gastosDiarios.update({
      where: { id_gasto: id },
      data,
    });

    return { success: true, data: gastoActualizado };
  } catch (error) {
    console.error("Error en actualizarGastoDiario:", error);
    return { success: false, message: "Error actualizando gasto diario" };
  }
}

/**
 * 📌 Eliminar un gasto diario por ID
 */
export async function eliminarGastoDiario(id: number) {
  try {
    await prisma.gastosDiarios.delete({ where: { id_gasto: id } });
    return { success: true, message: "Gasto eliminado correctamente" };
  } catch (error) {
    console.error("Error en eliminarGastoDiario:", error);
    return { success: false, message: "Error eliminando gasto diario" };
  }
}
