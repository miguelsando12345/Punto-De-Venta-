import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener una categoría de producto por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_categoria = parseInt(params.id);

    if (isNaN(id_categoria)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const categoria = await prisma.categoriaProductos.findUnique({
      where: { id_categoria },
      include: { productos: true }, // Incluye los productos asociados con la categoría
    });

    if (!categoria) {
      return NextResponse.json(
        { success: false, message: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: categoria },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/categoria-productos/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo categoría de producto" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar una categoría de producto por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_categoria = parseInt(params.id);

    if (isNaN(id_categoria)) {
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

    const categoriaActualizada = await prisma.categoriaProductos.update({
      where: { id_categoria },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: categoriaActualizada },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/categoria-productos/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando categoría de producto" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una categoría de producto por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_categoria = parseInt(params.id);

    if (isNaN(id_categoria)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    // Verificamos si la categoría existe antes de eliminarla
    const categoriaExistente = await prisma.categoriaProductos.findUnique({
      where: { id_categoria },
    });

    if (!categoriaExistente) {
      return NextResponse.json(
        { success: false, message: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    await prisma.categoriaProductos.delete({
      where: { id_categoria },
    });

    return NextResponse.json(
      { success: true, message: "Categoría eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/categoria-productos/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando categoría de producto" },
      { status: 500 }
    );
  }
}
