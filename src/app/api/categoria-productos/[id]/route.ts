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
 * 📌 Obtener una categoría por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const categoriaRepo = AppDataSource.getRepository(CategoriaProductos);
    const categoria = await categoriaRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!categoria) {
      return NextResponse.json(
        { success: false, message: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: categoria });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo categoría", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar una categoría por ID (PUT)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const categoriaRepo = AppDataSource.getRepository(CategoriaProductos);
    const categoria = await categoriaRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!categoria) {
      return NextResponse.json(
        { success: false, message: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    const { nombre, descripcion, activo } = await req.json();

    if (nombre) categoria.nombre = nombre;
    if (descripcion) categoria.descripcion = descripcion;
    if (activo !== undefined) categoria.activo = activo;

    const categoriaActualizada = await categoriaRepo.save(categoria);

    return NextResponse.json({ success: true, data: categoriaActualizada });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando categoría", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una categoría por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const categoriaRepo = AppDataSource.getRepository(CategoriaProductos);
    const categoria = await categoriaRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!categoria) {
      return NextResponse.json(
        { success: false, message: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    await categoriaRepo.remove(categoria);

    return NextResponse.json({
      success: true,
      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando categoría", error },
      { status: 500 }
    );
  }
}
