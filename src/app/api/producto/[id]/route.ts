import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener un producto por ID (GET)
 */
export async function GET(
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
  } catch (error) {
    console.error("Error en GET /api/producto/[id]:", error);
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
    const productoActualizado = await prisma.productos.update({
      where: { id_producto },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: productoActualizado },
      { status: 200 }
    );
  } catch (error) {
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
  } catch (error) {
    console.error("Error en DELETE /api/producto/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando producto" },
      { status: 500 }
    );
  }
}
