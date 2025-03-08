import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener un pago por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_pago = parseInt(params.id);

    if (isNaN(id_pago)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const pago = await prisma.pagos.findUnique({
      where: { id_pago },
      include: {
        comanda: true,
        metodo_pago: true,
      },
    });

    if (!pago) {
      return NextResponse.json(
        { success: false, message: "Pago no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pago }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/pagos/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo pago" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un pago por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_pago = parseInt(params.id);

    if (isNaN(id_pago)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const pagoActualizado = await prisma.pagos.update({
      where: { id_pago },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: pagoActualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/pagos/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando pago" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un pago por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_pago = parseInt(params.id);

    if (isNaN(id_pago)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.pagos.delete({ where: { id_pago } });

    return NextResponse.json(
      { success: true, message: "Pago eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/pagos/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando pago" },
      { status: 500 }
    );
  }
}
