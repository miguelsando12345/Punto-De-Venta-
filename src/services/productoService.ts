import { NextRequest, NextResponse } from "next/server"; // Asegúrate de importar estos desde el paquete correcto
import prisma from "@/lib/prisma"; // Asegúrate de que la ruta sea correcta

/**
 * 📌 Obtener todos los productos (GET)
 */
export async function GETAll() {
  // Cambié el nombre de GET a GETAll para evitar la duplicación
  try {
    const productos = await prisma.productos.findMany({
      include: {
        categoria: true, // Incluye la información de la categoría del producto
        productos_insumo: {
          include: { insumo: true }, // Incluye los insumos necesarios para el producto
        },
      },
    });

    if (!productos.length) {
      return NextResponse.json(
        { success: false, message: "No hay productos registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: productos },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error en GETAll /api/producto:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo productos" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo producto (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const {
      nombre,
      descripcion,
      precio,
      categoria_id,
      disponible,
      productos_insumo,
    } = await req.json();

    // Validación de los campos
    if (!nombre || !precio || !categoria_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Nombre, precio y categoría son obligatorios.",
        },
        { status: 400 }
      );
    }

    // Crear el nuevo producto
    const nuevoProducto = await prisma.productos.create({
      data: {
        nombre,
        descripcion,
        precio,
        categoria_id,
        disponible: disponible ?? true, // Si no se especifica, por defecto es 'true'
        productos_insumo: {
          create: productos_insumo?.map(
            (insumo: { id_insumo: number; cantidad_requerida: number }) => ({
              id_insumo: insumo.id_insumo,
              cantidad_requerida: insumo.cantidad_requerida,
            })
          ),
        },
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoProducto },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error en POST /api/producto:", error);
    return NextResponse.json(
      { success: false, message: "Error creando producto" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Obtener un producto por ID (GET)
 */
export async function GETById(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Cambié el nombre de GET a GETById para evitar la duplicación
  try {
    const id_producto = parseInt(params.id);

    if (isNaN(id_producto)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const producto = await prisma.productos.findUnique({
      where: { id_producto },
      include: { categoria: true }, // Incluye la categoría del producto
    });

    if (!producto) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: producto },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error en GETById /api/producto/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo producto" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un producto por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_producto = parseInt(params.id);

    if (isNaN(id_producto)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, message: "El cuerpo de la solicitud está vacío" },
        { status: 400 }
      );
    }

    const productoActualizado = await prisma.productos.update({
      where: { id_producto },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: productoActualizado },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error en PATCH /api/producto/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando producto" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un producto por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_producto = parseInt(params.id);

    if (isNaN(id_producto)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.productos.delete({ where: { id_producto } });

    return NextResponse.json(
      { success: true, message: "Producto eliminado correctamente" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error en DELETE /api/producto/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando producto" },
      { status: 500 }
    );
  }
}
