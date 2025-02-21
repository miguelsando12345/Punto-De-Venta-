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
 * 📌 Obtener todos los productos en inventario (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const inventarioRepo = AppDataSource.getRepository(Inventario);
    const inventario = await inventarioRepo.find();

    if (!inventario.length) {
      return NextResponse.json(
        { success: false, message: "No hay productos en inventario" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: inventario });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo productos de inventario", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo producto en inventario (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const inventarioRepo = AppDataSource.getRepository(Inventario);

    const { productoId, cantidad, costoUnitario, valorTotal } = await req.json();

    // Verificar si el producto ya está en inventario
    const existingInventario = await inventarioRepo.findOne({ where: { productoId } });
    if (existingInventario) {
      return NextResponse.json(
        { success: false, message: "El producto ya está registrado en inventario" },
        { status: 400 }
      );
    }

    // Crear un nuevo registro de inventario
    const inventario = inventarioRepo.create({
      productoId,
      cantidad,
      costoUnitario,
      valorTotal,
    });

    // Guardar el producto en inventario
    const inventarioGuardado = await inventarioRepo.save(inventario);

    return NextResponse.json(
      { success: true, data: inventarioGuardado },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando producto en inventario", error },
      { status: 500 }
    );
  }
}
