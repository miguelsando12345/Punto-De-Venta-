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
 * 📌 Obtener todos los gastos diarios (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const gastosRepo = AppDataSource.getRepository(GastosDiarios);
    const gastos = await gastosRepo.find();

    if (!gastos.length) {
      return NextResponse.json(
        { success: false, message: "No hay gastos registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: gastos });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo gastos", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo gasto diario (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const gastosRepo = AppDataSource.getRepository(GastosDiarios);

    const { descripcion, monto, categoria, procesado } = await req.json();

    if (!descripcion || !monto || !categoria) {
      return NextResponse.json(
        { success: false, message: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const nuevoGasto = gastosRepo.create({
      descripcion,
      monto,
      categoria,
      procesado: procesado ?? false, // Si no se envía, se asigna `false`
    });

    const gastoGuardado = await gastosRepo.save(nuevoGasto);

    return NextResponse.json(
      { success: true, data: gastoGuardado },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando gasto", error },
      { status: 500 }
    );
  }
}
