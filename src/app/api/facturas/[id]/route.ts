import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener una factura por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_factura = parseInt(params.id);

    if (isNaN(id_factura)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const factura = await prisma.facturas.findUnique({
      where: { id_factura },
      include: {
        comanda: true,
      },
    });

    if (!factura) {
      return NextResponse.json(
        { success: false, message: "Factura no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: factura }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/facturas/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo factura" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una factura por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_factura = parseInt(params.id);

    if (isNaN(id_factura)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.facturas.delete({ where: { id_factura } });

    return NextResponse.json(
      { success: true, message: "Factura eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/facturas/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando factura" },
      { status: 500 }
    );
  }
}
