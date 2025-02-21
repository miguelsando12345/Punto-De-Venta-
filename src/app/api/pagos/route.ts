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
 * 📌 Obtener todos los pagos (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const pagosRepo = AppDataSource.getRepository(Pagos);
    const pagos = await pagosRepo.find();

    if (!pagos.length) {
      return NextResponse.json(
        { success: false, message: "No hay pagos registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pagos });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo pagos", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo pago (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const pagosRepo = AppDataSource.getRepository(Pagos);

    const { usuarioId, monto, metodoPago, descripcion } = await req.json();

    // Crear un nuevo pago
    const pago = pagosRepo.create({
      usuarioId,
      monto,
      metodoPago,
      descripcion,
    });

    // Guardar el pago en la base de datos
    const pagoGuardado = await pagosRepo.save(pago);

    return NextResponse.json(
      { success: true, data: pagoGuardado },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando pago", error },
      { status: 500 }
    );
  }
}
