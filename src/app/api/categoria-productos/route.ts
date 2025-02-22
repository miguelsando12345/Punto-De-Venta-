import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { CategoriaProductos } from "@/entities/CategoriaProductos";

/**
 * 📌 Asegura la conexión a la base de datos
 */
async function ensureDBConnection() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

/**
 * 📌 Obtener todas las categorías de productos (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const categoriaRepo = AppDataSource.getRepository(CategoriaProductos);
    const categorias = await categoriaRepo.find();

    if (!categorias.length) {
      return NextResponse.json(
        { success: false, message: "No hay categorías registradas" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: categorias });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo categorías", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear una nueva categoría de producto (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const categoriaRepo = AppDataSource.getRepository(CategoriaProductos);

    const { nombre, descripcion, activo } = await req.json();

    if (!nombre) {
      return NextResponse.json(
        { success: false, message: "El nombre es obligatorio" },
        { status: 400 }
      );
    }

    const nuevaCategoria = categoriaRepo.create({
      nombre,
      descripcion,
      activo: activo ?? true, // Si no se envía, se asigna `true` por defecto
    });

    const categoriaGuardada = await categoriaRepo.save(nuevaCategoria);

    return NextResponse.json(
      { success: true, data: categoriaGuardada },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando categoría", error },
      { status: 500 }
    );
  }
}
