import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todos los productos (GET)
 */
export async function GET() {
  try {
    const productos = await prisma.productos.findMany({
      include: { categoria: true }, // Incluye la información de la categoría del producto
    });

    if (!productos.length) {
      return NextResponse.json(
        { success: false, message: "No hay productos registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: productos },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/producto:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo productos" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo producto (POST)
 */
export async function POST(req: NextRequest) {
  try {
    // Verificamos si el cuerpo de la solicitud es null o no es un objeto
    const body = await req.json();

    // Verificación de que se recibió un objeto válido
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "El cuerpo de la solicitud debe ser un objeto válido.",
        },
        { status: 400 }
      );
    }

    const { nombre, descripcion, precio, categoria_id, disponible } = body;

    // Validación de campos obligatorios
    if (!nombre || !precio || !categoria_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Nombre, precio y categoría son obligatorios.",
        },
        { status: 400 }
      );
    }

    // Crear el nuevo producto en la base de datos
    const nuevoProducto = await prisma.productos.create({
      data: {
        nombre,
        descripcion,
        precio,
        categoria_id,
        disponible: disponible ?? true, // Si no se especifica, por defecto es 'true'
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoProducto },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Manejo de errores con mensajes más específicos
    console.error("Error en POST /api/producto:", error);

    // Si el error es del tipo Error, accedemos a su mensaje
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";

    return NextResponse.json(
      {
        success: false,
        message: "Error creando producto",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
