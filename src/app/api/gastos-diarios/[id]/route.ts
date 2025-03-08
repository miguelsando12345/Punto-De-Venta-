import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener un gasto diario por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_gasto = parseInt(params.id);

    if (isNaN(id_gasto)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const gasto = await prisma.gastosDiarios.findUnique({
      where: { id_gasto },
    });

    if (!gasto) {
      return NextResponse.json(
        { success: false, message: "Gasto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: gasto }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/gastos-diarios/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo gasto" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un gasto diario por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_gasto = parseInt(params.id);

    if (isNaN(id_gasto)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const gastoActualizado = await prisma.gastosDiarios.update({
      where: { id_gasto },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: gastoActualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/gastos-diarios/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando gasto" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un gasto diario por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_gasto = parseInt(params.id);

    if (isNaN(id_gasto)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.gastosDiarios.delete({ where: { id_gasto } });

    return NextResponse.json(
      { success: true, message: "Gasto eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/gastos-diarios/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando gasto" },
      { status: 500 }
    );
  }
}
