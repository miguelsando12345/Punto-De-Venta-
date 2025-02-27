import { AppDataSource } from "@/lib/data-source";
import { Inventario } from "@/entities/Inventario";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Inicializa la base de datos si no está inicializada
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
    console.error("Error al obtener el inventario:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo productos de inventario",
        error: (error as Error).message,
      },
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

    const body = await req.json();
    console.log("Datos recibidos:", body); // 🔍 Verifica los datos recibidos en consola

    const { productoId, cantidad, costoUnitario, valorTotal } = body;

    // Verifica si algún dato falta
    if (!productoId || !cantidad || !costoUnitario || !valorTotal) {
      console.error("Campos faltantes:", {
        productoId,
        cantidad,
        costoUnitario,
        valorTotal,
      });
      return NextResponse.json(
        { success: false, message: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Convertir valores a número
    const parsedCantidad = Number(cantidad);
    const parsedCostoUnitario = parseFloat(costoUnitario);
    const parsedValorTotal = parseFloat(valorTotal);

    if (
      isNaN(parsedCantidad) ||
      isNaN(parsedCostoUnitario) ||
      isNaN(parsedValorTotal)
    ) {
      console.error("Valores inválidos:", {
        cantidad,
        costoUnitario,
        valorTotal,
      });
      return NextResponse.json(
        {
          success: false,
          message:
            "Cantidad, costo unitario y valor total deben ser números válidos",
        },
        { status: 400 }
      );
    }

    // Verificar si el producto ya está en inventario
    const existingInventario = await inventarioRepo.findOne({
      where: { productoId },
    });

    if (existingInventario) {
      console.error("Producto duplicado:", productoId);
      return NextResponse.json(
        {
          success: false,
          message: "El producto ya está registrado en inventario",
        },
        { status: 400 }
      );
    }

    // Crear y guardar en la base de datos
    const nuevoInventario = inventarioRepo.create({
      productoId,
      cantidad: parsedCantidad,
      costoUnitario: parsedCostoUnitario,
      valorTotal: parsedValorTotal,
    });

    const inventarioGuardado = await inventarioRepo.save(nuevoInventario);
    console.log("Producto agregado:", inventarioGuardado);

    return NextResponse.json(
      { success: true, data: inventarioGuardado },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al agregar producto:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor", error },
      { status: 500 }
    );
  }
}
