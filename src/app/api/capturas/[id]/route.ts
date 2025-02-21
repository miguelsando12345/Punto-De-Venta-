import { AppDataSource } from "@/lib/data-source";
import { Capturas } from "@/entities/Capturas";
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
 * 📌 Obtener una captura por ID (GET)
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBConnection();
    const capturasRepo = AppDataSource.getRepository(Capturas);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const capturaId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(capturaId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const captura = await capturasRepo.findOneBy({ id: capturaId });

    if (!captura) {
      return NextResponse.json(
        { success: false, message: "Captura no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: captura });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo captura", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar una captura por ID (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    await ensureDBConnection();
    const capturasRepo = AppDataSource.getRepository(Capturas);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const capturaId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(capturaId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const captura = await capturasRepo.findOneBy({ id: capturaId });

    if (!captura) {
      return NextResponse.json(
        { success: false, message: "Captura no encontrada" },
        { status: 404 }
      );
    }

    const { tipoCaptura, descripcion, urlArchivo, activo } = await req.json();

    capturasRepo.merge(captura, {
      tipoCaptura,
      descripcion,
      urlArchivo,
      activo,
    });

    const capturaActualizada = await capturasRepo.save(captura);

    return NextResponse.json({ success: true, data: capturaActualizada });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando captura", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar una captura por ID (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    await ensureDBConnection();
    const capturasRepo = AppDataSource.getRepository(Capturas);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const capturaId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(capturaId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const captura = await capturasRepo.findOneBy({ id: capturaId });

    if (!captura) {
      return NextResponse.json(
        { success: false, message: "Captura no encontrada" },
        { status: 404 }
      );
    }

    await capturasRepo.remove(captura);

    return NextResponse.json({
      success: true,
      message: "Captura eliminada correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando captura", error },
      { status: 500 }
    );
  }
}
