import prisma from "@/lib/prisma";

/**
 * 📌 Obtener todos los clientes con sus comandas asociadas
 */
export async function obtenerClientes() {
  try {
    const clientes = await prisma.clientes.findMany({
      include: { comandas: true },
    });

    return { success: true, data: clientes };
  } catch (error) {
    console.error("Error en obtenerClientes:", error);
    return { success: false, message: "Error obteniendo clientes" };
  }
}

/**
 * 📌 Obtener un cliente por ID
 */
export async function obtenerClientePorId(id: number) {
  try {
    const cliente = await prisma.clientes.findUnique({
      where: { id_cliente: id },
      include: { comandas: true },
    });

    if (!cliente) {
      return { success: false, message: "Cliente no encontrado" };
    }

    return { success: true, data: cliente };
  } catch (error) {
    console.error("Error en obtenerClientePorId:", error);
    return { success: false, message: "Error obteniendo cliente" };
  }
}

/**
 * 📌 Crear un nuevo cliente
 */
export async function crearCliente(telefono: string, direccion?: string) {
  try {
    if (!telefono) {
      return { success: false, message: "El teléfono es obligatorio" };
    }

    const nuevoCliente = await prisma.clientes.create({
      data: { telefono, direccion },
    });

    return { success: true, data: nuevoCliente };
  } catch (error) {
    console.error("Error en crearCliente:", error);
    return { success: false, message: "Error creando cliente" };
  }
}

/**
 * 📌 Actualizar un cliente por ID
 */
export async function actualizarCliente(id: number, data: any) {
  try {
    const clienteExistente = await prisma.clientes.findUnique({
      where: { id_cliente: id },
    });

    if (!clienteExistente) {
      return { success: false, message: "Cliente no encontrado" };
    }

    const clienteActualizado = await prisma.clientes.update({
      where: { id_cliente: id },
      data,
    });

    return { success: true, data: clienteActualizado };
  } catch (error) {
    console.error("Error en actualizarCliente:", error);
    return { success: false, message: "Error actualizando cliente" };
  }
}

/**
 * 📌 Eliminar un cliente por ID
 */
export async function eliminarCliente(id: number) {
  try {
    await prisma.clientes.delete({ where: { id_cliente: id } });

    return { success: true, message: "Cliente eliminado correctamente" };
  } catch (error) {
    console.error("Error en eliminarCliente:", error);
    return { success: false, message: "Error eliminando cliente" };
  }
}
