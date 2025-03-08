import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todas las relaciones de productos e insumos (GET)
 */
export async function GET() {
  try {
    const productosInsumos = await prisma.productosInsumo.findMany({
      include: {
        producto: true,
        insumo: true,
      },
    });

    if (!productosInsumos.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No hay relaciones producto-insumo registradas",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: productosInsumos },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/productos-insumo:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo relaciones producto-insumo",
      },
      { status: 500 }
    );
  }
}

/**
 * 📌 Agregar una nueva relación producto-insumo (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { id_producto, id_insumo, cantidad_requerida } = await req.json();

    if (!id_producto || !id_insumo || !cantidad_requerida) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const nuevaRelacion = await prisma.productosInsumo.create({
      data: {
        id_producto,
        id_insumo,
        cantidad_requerida,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevaRelacion },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/productos-insumo:", error);
    return NextResponse.json(
      { success: false, message: "Error creando relación producto-insumo" },
      { status: 500 }
    );
  }
}
