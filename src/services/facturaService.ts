import prisma from "@/lib/prisma";

/**
 * 📌 Obtener todas las facturas
 */
export async function obtenerFacturas() {
  try {
    const facturas = await prisma.facturas.findMany({
      include: { comanda: true },
    });

    return { success: true, data: facturas };
  } catch (error) {
    console.error("Error en obtenerFacturas:", error);
    return { success: false, message: "Error obteniendo facturas" };
  }
}

/**
 * 📌 Obtener una factura por ID
 */
export async function obtenerFacturaPorId(id: number) {
  try {
    const factura = await prisma.facturas.findUnique({
      where: { id_factura: id },
      include: { comanda: true },
    });

    if (!factura) {
      return { success: false, message: "Factura no encontrada" };
    }

    return { success: true, data: factura };
  } catch (error) {
    console.error("Error en obtenerFacturaPorId:", error);
    return { success: false, message: "Error obteniendo factura" };
  }
}

/**
 * 📌 Crear una nueva factura
 */
export async function crearFactura(data: {
  id_comanda: number;
  fecha_hora?: Date;
}) {
  try {
    if (!data.id_comanda) {
      return { success: false, message: "ID de la comanda es obligatorio" };
    }

    const nuevaFactura = await prisma.facturas.create({
      data: {
        id_comanda: data.id_comanda,
        fecha_hora: data.fecha_hora || new Date(),
      },
    });

    return { success: true, data: nuevaFactura };
  } catch (error) {
    console.error("Error en crearFactura:", error);
    return { success: false, message: "Error creando factura" };
  }
}

/**
 * 📌 Eliminar una factura por ID
 */
export async function eliminarFactura(id: number) {
  try {
    await prisma.facturas.delete({ where: { id_factura: id } });
    return { success: true, message: "Factura eliminada correctamente" };
  } catch (error) {
    console.error("Error en eliminarFactura:", error);
    return { success: false, message: "Error eliminando factura" };
  }
}
