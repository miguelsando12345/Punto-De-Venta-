import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener una comanda por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_comanda = parseInt(params.id);

    if (isNaN(id_comanda)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const comanda = await prisma.comandas.findUnique({
      where: { id_comanda },
      include: {
        usuario: true,
        cliente: true,
        mesa: true,
        detalle_comanda: true,
        facturas: true,
        pagos: true,
      },
    });

    if (!comanda) {
      return NextResponse.json(
        { success: false, message: "Comanda no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: comanda }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/comandas/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo comanda" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar una comanda por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_comanda = parseInt(params.id);

    if (isNaN(id_comanda)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const comandaActualizada = await prisma.comandas.update({
      where: { id_comanda },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: comandaActualizada },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/comandas/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando comanda" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una comanda por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_comanda = parseInt(params.id);

    if (isNaN(id_comanda)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.comandas.delete({ where: { id_comanda } });

    return NextResponse.json(
      { success: true, message: "Comanda eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/comandas/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando comanda" },
      { status: 500 }
    );
  }
}
