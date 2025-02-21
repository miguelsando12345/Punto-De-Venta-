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
 * 📌 Obtener todos los registros de ventas diarias (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const ventasRepo = AppDataSource.getRepository(VentasDiarias);
    const ventas = await ventasRepo.find();

    if (!ventas.length) {
      return NextResponse.json(
        { success: false, message: "No hay registros de ventas diarias" },
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
 * 📌 Crear un nuevo registro de ventas diarias (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const ventasRepo = AppDataSource.getRepository(VentasDiarias);

    const { fecha, totalVentas, totalProductosVendidos, totalDescuentos, totalImpuestos, totalNeto } =
      await req.json();

    // Crear un nuevo registro de ventas diarias
    const ventas = ventasRepo.create({
      fecha,
      totalVentas,
      totalProductosVendidos,
      totalDescuentos,
      totalImpuestos,
      totalNeto,
    });

    // Guardar el registro en la base de datos
    const ventasGuardadas = await ventasRepo.save(ventas);

    return NextResponse.json(
      { success: true, data: ventasGuardadas },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando registro de ventas diarias", error },
      { status: 500 }
    );
  }
}
