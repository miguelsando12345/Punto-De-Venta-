import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener un detalle de comanda por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_detalle = parseInt(params.id);

    if (isNaN(id_detalle)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const detalle = await prisma.detalleComanda.findUnique({
      where: { id_detalle },
      include: {
        comanda: true,
        producto: true,
      },
    });

    if (!detalle) {
      return NextResponse.json(
        { success: false, message: "Detalle de comanda no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: detalle }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/detalles-comanda/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo detalle de comanda" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un detalle de comanda por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_detalle = parseInt(params.id);

    if (isNaN(id_detalle)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const detalleActualizado = await prisma.detalleComanda.update({
      where: { id_detalle },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: detalleActualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/detalles-comanda/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando detalle de comanda" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un detalle de comanda por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_detalle = parseInt(params.id);

    if (isNaN(id_detalle)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.detalleComanda.delete({ where: { id_detalle } });

    return NextResponse.json(
      { success: true, message: "Detalle de comanda eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/detalles-comanda/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando detalle de comanda" },
      { status: 500 }
    );
  }
}
