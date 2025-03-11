import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todas las categorías de productos (GET)
 */
export async function GET() {
  try {
    const categorias = await prisma.categoriaProductos.findMany({
      include: { productos: true }, // Incluye los productos asociados con la categoría
    });

    if (!categorias.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No hay categorías de productos registradas",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: categorias },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/categoria-productos:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo categorías de productos" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear una nueva categoría de producto (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "El cuerpo de la solicitud debe ser un objeto válido",
        },
        { status: 400 }
      );
    }

    const { nombre } = body;

    if (!nombre) {
      return NextResponse.json(
        { success: false, message: "El nombre de la categoría es obligatorio" },
        { status: 400 }
      );
    }

    const nuevaCategoria = await prisma.categoriaProductos.create({
      data: {
        nombre,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevaCategoria },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error en POST /api/categoria-productos:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      {
        success: false,
        message: "Error creando categoría de producto",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
