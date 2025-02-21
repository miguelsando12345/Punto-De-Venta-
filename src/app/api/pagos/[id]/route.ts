import { AppDataSource } from "@/lib/data-source";
import { Pagos } from "@/entities/Pagos";
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
 * 📌 Obtener un pago por ID (GET)
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBConnection();
    const pagosRepo = AppDataSource.getRepository(Pagos);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const pagoId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(pagoId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const pago = await pagosRepo.findOneBy({ id: pagoId });

    if (!pago) {
      return NextResponse.json(
        { success: false, message: "Pago no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pago });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo pago", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un pago por ID (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    await ensureDBConnection();
    const pagosRepo = AppDataSource.getRepository(Pagos);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const pagoId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(pagoId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const pago = await pagosRepo.findOneBy({ id: pagoId });

    if (!pago) {
      return NextResponse.json(
        { success: false, message: "Pago no encontrado" },
        { status: 404 }
      );
    }

    const { monto, metodoPago, descripcion, procesado } = await req.json();

    pagosRepo.merge(pago, {
      monto,
      metodoPago,
      descripcion,
      procesado,
    });

    const pagoActualizado = await pagosRepo.save(pago);

    return NextResponse.json({ success: true, data: pagoActualizado });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando pago", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un pago por ID (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    await ensureDBConnection();
    const pagosRepo = AppDataSource.getRepository(Pagos);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const pagoId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(pagoId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const pago = await pagosRepo.findOneBy({ id: pagoId });

    if (!pago) {
      return NextResponse.json(
        { success: false, message: "Pago no encontrado" },
        { status: 404 }
      );
    }

    await pagosRepo.remove(pago);

    return NextResponse.json({
      success: true,
      message: "Pago eliminado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando pago", error },
      { status: 500 }
    );
  }
}
