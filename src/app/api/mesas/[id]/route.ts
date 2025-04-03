import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener una mesa por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params?: { id?: string } }
) {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { success: false, message: "ID no proporcionado" },
        { status: 400 }
      );
    }

    const id_mesa = parseInt(params.id);
    if (isNaN(id_mesa)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const mesa = await prisma.mesas.findUnique({
      where: { id_mesa },
      include: { comandas: true },
    });

    if (!mesa) {
      return NextResponse.json(
        { success: false, message: "Mesa no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: mesa }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/mesas/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo mesa" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar una mesa por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params?: { id?: string } }
) {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { success: false, message: "ID no proporcionado" },
        { status: 400 }
      );
    }

    const id_mesa = parseInt(params.id);
    if (isNaN(id_mesa)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, message: "Datos de actualización no proporcionados" },
        { status: 400 }
      );
    }

    const mesaActualizada = await prisma.mesas.update({
      where: { id_mesa },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: mesaActualizada },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/mesas/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando la mesa" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una mesa por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params?: { id?: string } }
) {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { success: false, message: "ID no proporcionado" },
        { status: 400 }
      );
    }

    const id_mesa = parseInt(params.id);
    if (isNaN(id_mesa)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.mesas.delete({ where: { id_mesa } });

    return NextResponse.json(
      { success: true, message: "Mesa eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/mesas/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando mesa" },
      { status: 500 }
    );
  }
}
