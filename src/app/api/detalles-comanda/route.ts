import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { DetalleComanda } from "@/entities/DetalleComanda";

/**
 * 📌 Asegura la conexión a la base de datos
 */
async function ensureDBConnection() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

/**
 * 📌 Obtener todos los detalles de comanda (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const detallesRepo = AppDataSource.getRepository(DetalleComanda);
    const detalles = await detallesRepo.find();

    if (!detalles.length) {
      return NextResponse.json(
        { success: false, message: "No hay detalles de comanda registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: detalles });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo detalles de comanda",
        error,
      },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo detalle de comanda (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const detallesRepo = AppDataSource.getRepository(DetalleComanda);

    const { comandaId, productoId, cantidad, precioUnitario } =
      await req.json();

    if (!comandaId || !productoId || !cantidad || !precioUnitario) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const nuevoDetalle = detallesRepo.create({
      comandaId,
      productoId,
      cantidad,
      precioUnitario,
    });

    const detalleGuardado = await detallesRepo.save(nuevoDetalle);

    return NextResponse.json(
      { success: true, data: detalleGuardado },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando detalle de comanda", error },
      { status: 500 }
    );
  }
}
