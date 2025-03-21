import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todos los productos (GET)
 */
export async function GET() {
  try {
    const productos = await prisma.productos.findMany({
      include: {
        categoria: true, // Incluye la información de la categoría del producto
        productos_insumo: {
          include: { insumo: true }, // Incluye los insumos necesarios para el producto
        },
      },
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
    const {
      nombre,
      descripcion,
      precio,
      categoria_id,
      disponible,
      productos_insumo,
    } = await req.json();

    // Validación de los campos
    if (!nombre || !precio || !categoria_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Nombre, precio y categoría son obligatorios.",
        },
        { status: 400 }
      );
    }

    // Crear el nuevo producto
    const nuevoProducto = await prisma.productos.create({
      data: {
        nombre,
        descripcion,
        precio,
        categoria_id,
        disponible: disponible ?? true, // Si no se especifica, por defecto es 'true'
        productos_insumo: {
          create: productos_insumo?.map(
            (insumo: { id_insumo: number; cantidad_requerida: number }) => ({
              id_insumo: insumo.id_insumo,
              cantidad_requerida: insumo.cantidad_requerida,
            })
          ),
        },
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoProducto },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/producto:", error);
    return NextResponse.json(
      { success: false, message: "Error creando producto" },
      { status: 500 }
    );
  }
}
