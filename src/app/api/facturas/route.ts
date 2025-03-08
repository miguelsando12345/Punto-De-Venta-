import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todas las facturas (GET)
 */
export async function GET() {
  try {
    const facturas = await prisma.facturas.findMany({
      include: {
        comanda: true,
      },
    });

    if (!facturas.length) {
      return NextResponse.json(
        { success: false, message: "No hay facturas registradas" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: facturas },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/facturas:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo facturas" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear una nueva factura (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { id_comanda, fecha_hora } = await req.json();

    if (!id_comanda) {
      return NextResponse.json(
        { success: false, message: "ID de la comanda es obligatorio" },
        { status: 400 }
      );
    }

    const nuevaFactura = await prisma.facturas.create({
      data: {
        id_comanda,
        fecha_hora: fecha_hora ? new Date(fecha_hora) : new Date(),
      },
    });

    return NextResponse.json(
      { success: true, data: nuevaFactura },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/facturas:", error);
    return NextResponse.json(
      { success: false, message: "Error creando factura" },
      { status: 500 }
    );
  }
}
