import prisma from "@/lib/prisma";

/**
 * 📌 Obtener todos los pagos
 */
export async function obtenerPagos() {
  try {
    const pagos = await prisma.pagos.findMany({
      include: {
        comanda: true,
        metodo_pago: true,
      },
    });

    if (!pagos.length) {
      return {
        success: false,
        message: "No hay pagos registrados",
        status: 404,
      };
    }

    return { success: true, data: pagos, status: 200 };
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    return { success: false, message: "Error obteniendo pagos", status: 500 };
  }
}

/**
 * 📌 Registrar un nuevo pago
 */
export async function registrarPago(
  id_comanda: number,
  id_metodo_pago: number,
  fecha_hora?: string
) {
  try {
    const nuevoPago = await prisma.pagos.create({
      data: {
        id_comanda,
        id_metodo_pago,
        fecha_hora: fecha_hora ? new Date(fecha_hora) : new Date(),
      },
    });

    return { success: true, data: nuevoPago, status: 201 };
  } catch (error) {
    console.error("Error al registrar pago:", error);
    return { success: false, message: "Error registrando pago", status: 500 };
  }
}

/**
 * 📌 Obtener un pago por ID
 */
export async function obtenerPagoPorId(id_pago: number) {
  try {
    const pago = await prisma.pagos.findUnique({
      where: { id_pago },
      include: {
        comanda: true,
        metodo_pago: true,
      },
    });

    if (!pago) {
      return { success: false, message: "Pago no encontrado", status: 404 };
    }

    return { success: true, data: pago, status: 200 };
  } catch (error) {
    console.error("Error al obtener pago por ID:", error);
    return { success: false, message: "Error obteniendo pago", status: 500 };
  }
}

/**
 * 📌 Actualizar un pago por ID
 */
export async function actualizarPago(id_pago: number, data: any) {
  try {
    const pagoActualizado = await prisma.pagos.update({
      where: { id_pago },
      data,
    });

    return { success: true, data: pagoActualizado, status: 200 };
  } catch (error) {
    console.error("Error al actualizar pago:", error);
    return { success: false, message: "Error actualizando pago", status: 500 };
  }
}

/**
 * 📌 Eliminar un pago por ID
 */
export async function eliminarPago(id_pago: number) {
  try {
    await prisma.pagos.delete({
      where: { id_pago },
    });

    return {
      success: true,
      message: "Pago eliminado correctamente",
      status: 200,
    };
  } catch (error) {
    console.error("Error al eliminar pago:", error);
    return { success: false, message: "Error eliminando pago", status: 500 };
  }
}
