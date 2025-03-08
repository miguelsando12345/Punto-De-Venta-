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
