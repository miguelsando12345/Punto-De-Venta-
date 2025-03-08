import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todos los clientes (GET)
 */
export async function GET() {
  try {
    const clientes = await prisma.clientes.findMany({
      include: { comandas: true }, // Incluir comandas asociadas al cliente
    });

    if (!clientes.length) {
      return NextResponse.json(
        { success: false, message: "No hay clientes registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: clientes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/clientes:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo clientes" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo cliente (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { telefono, direccion } = await req.json();

    if (!telefono) {
      return NextResponse.json(
        { success: false, message: "El teléfono es obligatorio" },
        { status: 400 }
      );
    }

    const nuevoCliente = await prisma.clientes.create({
      data: {
        telefono,
        direccion,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoCliente },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/clientes:", error);
    return NextResponse.json(
      { success: false, message: "Error creando cliente" },
      { status: 500 }
    );
  }
}
