import { AppDataSource } from "@/lib/data-source";
import { Inventario } from "@/entities/Inventario";
import { NextRequest, NextResponse } from "next/server";

/**
 * Inicializa la base de datos si no está inicializada
 */
async function ensureDBConnection() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

/**
 * 📌 Obtener un producto en inventario por ID (GET)
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBConnection();
    const inventarioRepo = AppDataSource.getRepository(Inventario);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const inventarioId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(inventarioId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const inventario = await inventarioRepo.findOneBy({ id: inventarioId });

    if (!inventario) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado en inventario" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: inventario });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo producto en inventario", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un producto en inventario por ID (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    await ensureDBConnection();
    const inventarioRepo = AppDataSource.getRepository(Inventario);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const inventarioId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(inventarioId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const inventario = await inventarioRepo.findOneBy({ id: inventarioId });

    if (!inventario) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado en inventario" },
        { status: 404 }
      );
    }

    const { productoId, cantidad, costoUnitario, valorTotal } = await req.json();

    inventarioRepo.merge(inventario, {
      productoId,
      cantidad,
      costoUnitario,
      valorTotal,
    });

    const inventarioActualizado = await inventarioRepo.save(inventario);

    return NextResponse.json({ success: true, data: inventarioActualizado });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando producto en inventario", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un producto en inventario por ID (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    await ensureDBConnection();
    const inventarioRepo = AppDataSource.getRepository(Inventario);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const inventarioId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(inventarioId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const inventario = await inventarioRepo.findOneBy({ id: inventarioId });

    if (!inventario) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado en inventario" },
        { status: 404 }
      );
    }

    await inventarioRepo.remove(inventario);

    return NextResponse.json({
      success: true,
      message: "Producto eliminado correctamente de inventario",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando producto de inventario", error },
      { status: 500 }
    );
  }
}
