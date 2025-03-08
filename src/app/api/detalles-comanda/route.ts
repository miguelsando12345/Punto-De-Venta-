import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todos los detalles de comandas (GET)
 */
export async function GET() {
  try {
    const detalles = await prisma.detalleComanda.findMany({
      include: {
        comanda: true,
        producto: true,
      },
    });

    if (!detalles.length) {
      return NextResponse.json(
        { success: false, message: "No hay detalles de comandas registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: detalles },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/detalles-comanda:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo detalles de comandas" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo detalle de comanda (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { id_comanda, id_producto, cantidad, precio_unitario } =
      await req.json();

    if (!id_comanda || !id_producto || !cantidad || !precio_unitario) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const nuevoDetalle = await prisma.detalleComanda.create({
      data: {
        id_comanda,
        id_producto,
        cantidad,
        precio_unitario,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoDetalle },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/detalles-comanda:", error);
    return NextResponse.json(
      { success: false, message: "Error creando detalle de comanda" },
      { status: 500 }
    );
  }
}
