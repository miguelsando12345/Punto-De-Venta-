import { AppDataSource } from "@/lib/data-source";
import { Mesas } from "@/entities/Mesas";
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
 * 📌 Obtener una mesa por ID (GET)
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBConnection();
    const mesasRepo = AppDataSource.getRepository(Mesas);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const mesaId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(mesaId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const mesa = await mesasRepo.findOneBy({ id: mesaId });

    if (!mesa) {
      return NextResponse.json(
        { success: false, message: "Mesa no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: mesa });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo mesa", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar una mesa por ID (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    await ensureDBConnection();
    const mesasRepo = AppDataSource.getRepository(Mesas);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const mesaId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(mesaId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const mesa = await mesasRepo.findOneBy({ id: mesaId });

    if (!mesa) {
      return NextResponse.json(
        { success: false, message: "Mesa no encontrada" },
        { status: 404 }
      );
    }

    const { nombre, descripcion, capacidad, disponible } = await req.json();

    mesasRepo.merge(mesa, {
      nombre,
      descripcion,
      capacidad,
      disponible,
    });

    const mesaActualizada = await mesasRepo.save(mesa);

    return NextResponse.json({ success: true, data: mesaActualizada });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando mesa", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una mesa por ID (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    await ensureDBConnection();
    const mesasRepo = AppDataSource.getRepository(Mesas);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const mesaId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(mesaId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const mesa = await mesasRepo.findOneBy({ id: mesaId });

    if (!mesa) {
      return NextResponse.json(
        { success: false, message: "Mesa no encontrada" },
        { status: 404 }
      );
    }

    await mesasRepo.remove(mesa);

    return NextResponse.json({
      success: true,
      message: "Mesa eliminada correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando mesa", error },
      { status: 500 }
    );
  }
}
