import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todos los gastos diarios (GET)
 */
export async function GET() {
  try {
    const gastos = await prisma.gastosDiarios.findMany();

    if (!gastos.length) {
      return NextResponse.json(
        { success: false, message: "No hay gastos registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: gastos }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/gastos-diarios:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo gastos diarios" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo gasto diario (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { fecha, descripcion, monto } = await req.json();

    if (!fecha || !descripcion || !monto) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const nuevoGasto = await prisma.gastosDiarios.create({
      data: {
        fecha: new Date(fecha),
        descripcion,
        monto,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoGasto },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/gastos-diarios:", error);
    return NextResponse.json(
      { success: false, message: "Error creando gasto diario" },
      { status: 500 }
    );
  }
}
