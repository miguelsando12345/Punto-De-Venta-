import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { MetodosPago } from "@/entities/MetodosPago";

/**
 * 📌 Asegura la conexión a la base de datos
 */
async function ensureDBConnection() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

/**
 * 📌 Obtener un método de pago por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const metodosRepo = AppDataSource.getRepository(MetodosPago);
    const metodo = await metodosRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!metodo) {
      return NextResponse.json(
        { success: false, message: "Método de pago no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: metodo });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo método de pago", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un método de pago por ID (PUT)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const metodosRepo = AppDataSource.getRepository(MetodosPago);
    const metodo = await metodosRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!metodo) {
      return NextResponse.json(
        { success: false, message: "Método de pago no encontrado" },
        { status: 404 }
      );
    }

    const { nombre, monto, activo } = await req.json();

    if (nombre) metodo.nombre = nombre;
    if (monto !== undefined) metodo.monto = monto;
    if (activo !== undefined) metodo.activo = activo;

    const metodoActualizado = await metodosRepo.save(metodo);

    return NextResponse.json({ success: true, data: metodoActualizado });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando método de pago", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un método de pago por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const metodosRepo = AppDataSource.getRepository(MetodosPago);
    const metodo = await metodosRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!metodo) {
      return NextResponse.json(
        { success: false, message: "Método de pago no encontrado" },
        { status: 404 }
      );
    }

    await metodosRepo.remove(metodo);

    return NextResponse.json({
      success: true,
      message: "Método de pago eliminado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando método de pago", error },
      { status: 500 }
    );
  }
}
