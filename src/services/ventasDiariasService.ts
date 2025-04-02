import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todas las ventas diarias (GET)
 */
export async function GET() {
  try {
    const ventas = await prisma.ventasDiarias.findMany();

    if (!ventas.length) {
      return NextResponse.json(
        { success: false, message: "No hay ventas registradas" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: ventas }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/ventas-diarias:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo ventas diarias" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Registrar una nueva venta diaria (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { fecha, total } = await req.json();

    if (!fecha || !total) {
      return NextResponse.json(
        { success: false, message: "Fecha y total son obligatorios" },
        { status: 400 }
      );
    }

    const nuevaVenta = await prisma.ventasDiarias.create({
      data: {
        fecha: new Date(fecha),
        total,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevaVenta },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/ventas-diarias:", error);
    return NextResponse.json(
      { success: false, message: "Error registrando venta diaria" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Obtener una venta diaria por ID (GET)
 */
export async function GET_BY_ID(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_venta = parseInt(params.id);

    if (isNaN(id_venta)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const venta = await prisma.ventasDiarias.findUnique({
      where: { id_venta },
    });

    if (!venta) {
      return NextResponse.json(
        { success: false, message: "Venta diaria no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: venta }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/ventas-diarias/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo venta diaria" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar una venta diaria por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_venta = parseInt(params.id);

    if (isNaN(id_venta)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const ventaActualizada = await prisma.ventasDiarias.update({
      where: { id_venta },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: ventaActualizada },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/ventas-diarias/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando venta diaria" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una venta diaria por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_venta = parseInt(params.id);

    if (isNaN(id_venta)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.ventasDiarias.delete({ where: { id_venta } });

    return NextResponse.json(
      { success: true, message: "Venta diaria eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/ventas-diarias/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando venta diaria" },
      { status: 500 }
    );
  }
}
