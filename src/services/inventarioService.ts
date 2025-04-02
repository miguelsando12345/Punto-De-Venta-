import prisma from "@/lib/prisma";

/**
 * 📌 Obtener todos los insumos del inventario
 */
export async function obtenerInsumosInventario() {
  try {
    const inventario = await prisma.inventario.findMany({
      include: {
        productos_insumo: {
          include: {
            producto: true, // Para incluir los productos asociados
          },
        },
      },
    });
    return { success: true, data: inventario };
  } catch (error) {
    console.error("Error en obtenerInsumosInventario:", error);
    return { success: false, message: "Error obteniendo inventario" };
  }
}

/**
 * 📌 Obtener un insumo del inventario por ID
 */
export async function obtenerInsumoPorId(id: number) {
  try {
    const insumo = await prisma.inventario.findUnique({
      where: { id_insumo: id },
      include: {
        productos_insumo: {
          include: {
            producto: true, // Para incluir los productos asociados
          },
        },
      },
    });

    if (!insumo) {
      return { success: false, message: "Insumo no encontrado" };
    }

    return { success: true, data: insumo };
  } catch (error) {
    console.error("Error en obtenerInsumoPorId:", error);
    return {
      success: false,
      message: "Error obteniendo insumo del inventario",
    };
  }
}

/**
 * 📌 Crear un nuevo insumo en el inventario
 */
export async function crearInsumoInventario(data: {
  nombre: string;
  unidad_disponible: number;
  unidad_medida: "Kg" | "Litros" | "Unidad"; // Tipado explícito de unidad_medida
}) {
  try {
    const { nombre, unidad_disponible, unidad_medida } = data;

    if (!nombre || !unidad_disponible || !unidad_medida) {
      return { success: false, message: "Todos los campos son obligatorios" };
    }

    const nuevoInsumo = await prisma.inventario.create({
      data: {
        nombre,
        unidad_disponible,
        unidad_medida, // Usamos la enumeración de forma correcta
      },
    });

    return { success: true, data: nuevoInsumo };
  } catch (error) {
    console.error("Error en crearInsumoInventario:", error);
    return { success: false, message: "Error creando insumo en el inventario" };
  }
}

/**
 * 📌 Actualizar un insumo en el inventario por ID
 */
export async function actualizarInsumoInventario(
  id: number,
  data: {
    nombre?: string;
    unidad_disponible?: number;
    unidad_medida?: "Kg" | "Litros" | "Unidad"; // Tipado explícito de unidad_medida
  }
) {
  try {
    // Verificamos si la unidad_medida es válida
    if (
      data.unidad_medida &&
      !["Kg", "Litros", "Unidad"].includes(data.unidad_medida)
    ) {
      return { success: false, message: "Unidad de medida inválida" };
    }

    const insumoActualizado = await prisma.inventario.update({
      where: { id_insumo: id },
      data,
    });

    return { success: true, data: insumoActualizado };
  } catch (error) {
    console.error("Error en actualizarInsumoInventario:", error);
    return {
      success: false,
      message: "Error actualizando insumo en el inventario",
    };
  }
}

/**
 * 📌 Eliminar un insumo del inventario por ID
 */
export async function eliminarInsumoInventario(id: number) {
  try {
    await prisma.inventario.delete({ where: { id_insumo: id } });
    return { success: true, message: "Insumo eliminado correctamente" };
  } catch (error) {
    console.error("Error en eliminarInsumoInventario:", error);
    return {
      success: false,
      message: "Error eliminando insumo del inventario",
    };
  }
}
