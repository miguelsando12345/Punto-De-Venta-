import { AppDataSource } from "@/lib/data-source";
import { Comandas } from "@/entities/Comandas";
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
 * 📌 Obtener una comanda por ID (GET)
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBConnection();
    const comandasRepo = AppDataSource.getRepository(Comandas);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const comandaId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(comandaId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const comanda = await comandasRepo.findOneBy({ id: comandaId });

    if (!comanda) {
      return NextResponse.json(
        { success: false, message: "Comanda no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: comanda });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo comanda", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar una comanda por ID (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    await ensureDBConnection();
    const comandasRepo = AppDataSource.getRepository(Comandas);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const comandaId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(comandaId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const comanda = await comandasRepo.findOneBy({ id: comandaId });

    if (!comanda) {
      return NextResponse.json(
        { success: false, message: "Comanda no encontrada" },
        { status: 404 }
      );
    }

    const { mesaId, estado, total, fecha, notas, pagado } = await req.json();

    comandasRepo.merge(comanda, {
      mesaId,
      estado,
      total,
      fecha,
      notas,
      pagado,
    });

    const comandaActualizada = await comandasRepo.save(comanda);

    return NextResponse.json({ success: true, data: comandaActualizada });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando comanda", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una comanda por ID (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    await ensureDBConnection();
    const comandasRepo = AppDataSource.getRepository(Comandas);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const comandaId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(comandaId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const comanda = await comandasRepo.findOneBy({ id: comandaId });

    if (!comanda) {
      return NextResponse.json(
        { success: false, message: "Comanda no encontrada" },
        { status: 404 }
      );
    }

    await comandasRepo.remove(comanda);

    return NextResponse.json({
      success: true,
      message: "Comanda eliminada correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando comanda", error },
      { status: 500 }
    );
  }
}
