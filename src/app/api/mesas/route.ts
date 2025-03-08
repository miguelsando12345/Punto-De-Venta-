import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todas las mesas (GET)
 */
export async function GET() {
  try {
    const mesas = await prisma.mesas.findMany({
      include: {
        comandas: true,
      },
    });

    if (!mesas.length) {
      return NextResponse.json(
        { success: false, message: "No hay mesas registradas" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: mesas }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/mesas:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo mesas" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear una nueva mesa (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { numero, capacidad, estado } = await req.json();

    if (!numero || !capacidad || !estado) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const nuevaMesa = await prisma.mesas.create({
      data: {
        numero,
        capacidad,
        estado,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevaMesa },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/mesas:", error);
    return NextResponse.json(
      { success: false, message: "Error creando mesa" },
      { status: 500 }
    );
  }
}
