import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todos los métodos de pago (GET)
 */
export async function GET() {
  try {
    const metodosPago = await prisma.metodosPago.findMany({
      include: {
        pagos: true,
      },
    });

    if (!metodosPago.length) {
      return NextResponse.json(
        { success: false, message: "No hay métodos de pago registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: metodosPago },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/metodos-pago:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo métodos de pago" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo método de pago (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { nombre } = await req.json();

    if (!nombre) {
      return NextResponse.json(
        {
          success: false,
          message: "El nombre del método de pago es obligatorio",
        },
        { status: 400 }
      );
    }

    const nuevoMetodo = await prisma.metodosPago.create({
      data: {
        nombre,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoMetodo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/metodos-pago:", error);
    return NextResponse.json(
      { success: false, message: "Error creando método de pago" },
      { status: 500 }
    );
  }
}
