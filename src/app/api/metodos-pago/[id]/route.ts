import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener un método de pago por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_metodo_pago = parseInt(params.id);

    if (isNaN(id_metodo_pago)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const metodo = await prisma.metodosPago.findUnique({
      where: { id_metodo_pago },
      include: {
        pagos: true,
      },
    });

    if (!metodo) {
      return NextResponse.json(
        { success: false, message: "Método de pago no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: metodo }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/metodos-pago/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo método de pago" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un método de pago por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_metodo_pago = parseInt(params.id);

    if (isNaN(id_metodo_pago)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const metodoActualizado = await prisma.metodosPago.update({
      where: { id_metodo_pago },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: metodoActualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/metodos-pago/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando método de pago" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un método de pago por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_metodo_pago = parseInt(params.id);

    if (isNaN(id_metodo_pago)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.metodosPago.delete({ where: { id_metodo_pago } });

    return NextResponse.json(
      { success: true, message: "Método de pago eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/metodos-pago/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando método de pago" },
      { status: 500 }
    );
  }
}
