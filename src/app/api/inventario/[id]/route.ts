import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener un insumo del inventario por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_insumo = parseInt(params.id);

    if (isNaN(id_insumo)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const insumo = await prisma.inventario.findUnique({
      where: { id_insumo },
      include: {
        productos_insumo: true,
      },
    });

    if (!insumo) {
      return NextResponse.json(
        { success: false, message: "Insumo no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: insumo }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/inventario/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo insumo del inventario" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un insumo del inventario por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_insumo = parseInt(params.id);

    if (isNaN(id_insumo)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const insumoActualizado = await prisma.inventario.update({
      where: { id_insumo },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: insumoActualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/inventario/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando insumo del inventario" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un insumo del inventario por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_insumo = parseInt(params.id);

    if (isNaN(id_insumo)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.inventario.delete({ where: { id_insumo } });

    return NextResponse.json(
      { success: true, message: "Insumo eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/inventario/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando insumo del inventario" },
      { status: 500 }
    );
  }
}
