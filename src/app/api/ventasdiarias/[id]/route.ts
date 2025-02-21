import { AppDataSource } from "@/lib/data-source";
import { VentasDiarias } from "@/entities/VentasDiarias";
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
 * 📌 Obtener un registro de ventas diarias por ID (GET)
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBConnection();
    const ventasRepo = AppDataSource.getRepository(VentasDiarias);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const ventasId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(ventasId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const ventas = await ventasRepo.findOneBy({ id: ventasId });

    if (!ventas) {
      return NextResponse.json(
        { success: false, message: "Registro de ventas no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: ventas });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo ventas diarias", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un registro de ventas diarias por ID (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    await ensureDBConnection();
    const ventasRepo = AppDataSource.getRepository(VentasDiarias);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const ventasId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(ventasId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const ventas = await ventasRepo.findOneBy({ id: ventasId });

    if (!ventas) {
      return NextResponse.json(
        { success: false, message: "Registro de ventas no encontrado" },
        { status: 404 }
      );
    }

    const { fecha, totalVentas, totalProductosVendidos, totalDescuentos, totalImpuestos, totalNeto } =
      await req.json();

    ventasRepo.merge(ventas, {
      fecha,
      totalVentas,
      totalProductosVendidos,
      totalDescuentos,
      totalImpuestos,
      totalNeto,
    });

    const ventasActualizadas = await ventasRepo.save(ventas);

    return NextResponse.json({ success: true, data: ventasActualizadas });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando ventas diarias", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un registro de ventas diarias por ID (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    await ensureDBConnection();
    const ventasRepo = AppDataSource.getRepository(VentasDiarias);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const ventasId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(ventasId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const ventas = await ventasRepo.findOneBy({ id: ventasId });

    if (!ventas) {
      return NextResponse.json(
        { success: false, message: "Registro de ventas no encontrado" },
        { status: 404 }
      );
    }

    await ventasRepo.remove(ventas);

    return NextResponse.json({
      success: true,
      message: "Registro de ventas eliminado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando registro de ventas diarias", error },
      { status: 500 }
    );
  }
}
