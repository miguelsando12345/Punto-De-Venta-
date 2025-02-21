import { AppDataSource } from "@/lib/data-source";
import { Producto } from "@/entities/Producto";
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
 * 📌 Obtener un producto por ID (GET)
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBConnection();
    const productoRepo = AppDataSource.getRepository(Producto);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const productoId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(productoId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const producto = await productoRepo.findOneBy({ id: productoId });

    if (!producto) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: producto });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo producto", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un producto por ID (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    await ensureDBConnection();
    const productoRepo = AppDataSource.getRepository(Producto);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const productoId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(productoId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const producto = await productoRepo.findOneBy({ id: productoId });

    if (!producto) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const { nombre, descripcion, precio, stock, categoria, imagenUrl, disponible } =
      await req.json();

    productoRepo.merge(producto, {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagenUrl,
      disponible,
    });

    const productoActualizado = await productoRepo.save(producto);

    return NextResponse.json({ success: true, data: productoActualizado });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando producto", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un producto por ID (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    await ensureDBConnection();
    const productoRepo = AppDataSource.getRepository(Producto);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const productoId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(productoId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const producto = await productoRepo.findOneBy({ id: productoId });

    if (!producto) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    await productoRepo.remove(producto);

    return NextResponse.json({
      success: true,
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando producto", error },
      { status: 500 }
    );
  }
}
