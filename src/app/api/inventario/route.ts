import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todos los insumos del inventario (GET)
 */
export async function GET() {
  try {
    const inventario = await prisma.inventario.findMany({
      include: {
        productos_insumo: true,
      },
    });

    if (!inventario.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No hay insumos registrados en el inventario",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: inventario },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/inventario:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo inventario" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Agregar un nuevo insumo al inventario (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { nombre, unidad_disponible, unidad_medida } = await req.json();

    if (!nombre || !unidad_disponible || !unidad_medida) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const nuevoInsumo = await prisma.inventario.create({
      data: {
        nombre,
        unidad_disponible,
        unidad_medida,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoInsumo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/inventario:", error);
    return NextResponse.json(
      { success: false, message: "Error agregando insumo al inventario" },
      { status: 500 }
    );
  }
}
