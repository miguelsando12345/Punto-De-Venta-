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

/**
 * 📌 Obtener una relación producto-insumo por ID (GET)
 */
export async function GETById(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [id_producto, id_insumo] = params.id.split("-").map(Number);

    if (isNaN(id_producto) || isNaN(id_insumo)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const relacion = await prisma.productosInsumo.findUnique({
      where: { id_producto_id_insumo: { id_producto, id_insumo } },
      include: {
        producto: true,
        insumo: true,
      },
    });

    if (!relacion) {
      return NextResponse.json(
        { success: false, message: "Relación producto-insumo no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: relacion },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/productos-insumo/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo relación producto-insumo" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar una relación producto-insumo por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [id_producto, id_insumo] = params.id.split("-").map(Number);

    if (isNaN(id_producto) || isNaN(id_insumo)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const relacionActualizada = await prisma.productosInsumo.update({
      where: { id_producto_id_insumo: { id_producto, id_insumo } },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: relacionActualizada },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/productos-insumo/[id]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando relación producto-insumo",
      },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una relación producto-insumo por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [id_producto, id_insumo] = params.id.split("-").map(Number);

    if (isNaN(id_producto) || isNaN(id_insumo)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.productosInsumo.delete({
      where: { id_producto_id_insumo: { id_producto, id_insumo } },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Relación producto-insumo eliminada correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/productos-insumo/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando relación producto-insumo" },
      { status: 500 }
    );
  }
}
