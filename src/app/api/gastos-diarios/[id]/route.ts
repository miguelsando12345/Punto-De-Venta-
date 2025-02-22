import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { GastosDiarios } from "@/entities/GastosDiarios";

/**
 * 📌 Asegura la conexión a la base de datos
 */
async function ensureDBConnection() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

/**
 * 📌 Obtener un gasto diario por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const gastosRepo = AppDataSource.getRepository(GastosDiarios);
    const gasto = await gastosRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!gasto) {
      return NextResponse.json(
        { success: false, message: "Gasto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: gasto });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo el gasto", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un gasto diario por ID (PUT)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const gastosRepo = AppDataSource.getRepository(GastosDiarios);
    const gasto = await gastosRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!gasto) {
      return NextResponse.json(
        { success: false, message: "Gasto no encontrado" },
        { status: 404 }
      );
    }

    const { descripcion, monto, categoria, procesado } = await req.json();

    if (descripcion) gasto.descripcion = descripcion;
    if (monto) gasto.monto = monto;
    if (categoria) gasto.categoria = categoria;
    if (procesado !== undefined) gasto.procesado = procesado;

    const gastoActualizado = await gastosRepo.save(gasto);

    return NextResponse.json({ success: true, data: gastoActualizado });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando el gasto", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un gasto diario por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const gastosRepo = AppDataSource.getRepository(GastosDiarios);
    const gasto = await gastosRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!gasto) {
      return NextResponse.json(
        { success: false, message: "Gasto no encontrado" },
        { status: 404 }
      );
    }

    await gastosRepo.remove(gasto);

    return NextResponse.json({
      success: true,
      message: "Gasto eliminado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando el gasto", error },
      { status: 500 }
    );
  }
}
