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
 * 📌 Obtener todos los productos (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const productoRepo = AppDataSource.getRepository(Producto);
    const productos = await productoRepo.find();

    if (!productos.length) {
      return NextResponse.json(
        { success: false, message: "No hay productos registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: productos });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo productos", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo producto (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const productoRepo = AppDataSource.getRepository(Producto);

    const { nombre, descripcion, precio, stock, categoria, imagenUrl, disponible } =
      await req.json();

    // Verificar si el nombre del producto ya existe
    const existingProducto = await productoRepo.findOne({ where: { nombre } });
    if (existingProducto) {
      return NextResponse.json(
        { success: false, message: "El producto ya está registrado" },
        { status: 400 }
      );
    }

    // Crear un nuevo producto
    const producto = productoRepo.create({
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagenUrl,
      disponible,
    });

    // Guardar el producto en la base de datos
    const productoGuardado = await productoRepo.save(producto);

    return NextResponse.json(
      { success: true, data: productoGuardado },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando producto", error },
      { status: 500 }
    );
  }
}
