import prisma from "@/lib/prisma";

/**
 * 📌 Obtener todos los detalles de comandas
 */
export async function obtenerDetallesComanda() {
  try {
    const detalles = await prisma.detalleComanda.findMany({
      include: { comanda: true, producto: true },
    });

    return { success: true, data: detalles };
  } catch (error) {
    console.error("Error en obtenerDetallesComanda:", error);
    return { success: false, message: "Error obteniendo detalles de comandas" };
  }
}

/**
 * 📌 Obtener un detalle de comanda por ID
 */
export async function obtenerDetalleComandaPorId(id: number) {
  try {
    const detalle = await prisma.detalleComanda.findUnique({
      where: { id_detalle: id },
      include: { comanda: true, producto: true },
    });

    if (!detalle) {
      return { success: false, message: "Detalle de comanda no encontrado" };
    }

    return { success: true, data: detalle };
  } catch (error) {
    console.error("Error en obtenerDetalleComandaPorId:", error);
    return { success: false, message: "Error obteniendo detalle de comanda" };
  }
}

/**
 * 📌 Crear un nuevo detalle de comanda
 */
export async function crearDetalleComanda(data: {
  id_comanda: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}) {
  try {
    if (
      !data.id_comanda ||
      !data.id_producto ||
      !data.cantidad ||
      !data.precio_unitario
    ) {
      return { success: false, message: "Todos los campos son obligatorios" };
    }

    const nuevoDetalle = await prisma.detalleComanda.create({
      data,
    });

    return { success: true, data: nuevoDetalle };
  } catch (error) {
    console.error("Error en crearDetalleComanda:", error);
    return { success: false, message: "Error creando detalle de comanda" };
  }
}

/**
 * 📌 Actualizar un detalle de comanda por ID
 */
export async function actualizarDetalleComanda(id: number, data: any) {
  try {
    const detalleExistente = await prisma.detalleComanda.findUnique({
      where: { id_detalle: id },
    });

    if (!detalleExistente) {
      return { success: false, message: "Detalle de comanda no encontrado" };
    }

    const detalleActualizado = await prisma.detalleComanda.update({
      where: { id_detalle: id },
      data,
    });

    return { success: true, data: detalleActualizado };
  } catch (error) {
    console.error("Error en actualizarDetalleComanda:", error);
    return { success: false, message: "Error actualizando detalle de comanda" };
  }
}

/**
 * 📌 Eliminar un detalle de comanda por ID
 */
export async function eliminarDetalleComanda(id: number) {
  try {
    await prisma.detalleComanda.delete({ where: { id_detalle: id } });

    return {
      success: true,
      message: "Detalle de comanda eliminado correctamente",
    };
  } catch (error) {
    console.error("Error en eliminarDetalleComanda:", error);
    return { success: false, message: "Error eliminando detalle de comanda" };
  }
}
