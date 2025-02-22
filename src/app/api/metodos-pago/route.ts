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
 * 📌 Obtener todos los métodos de pago (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const metodosRepo = AppDataSource.getRepository(MetodosPago);
    const metodos = await metodosRepo.find();

    if (!metodos.length) {
      return NextResponse.json(
        { success: false, message: "No hay métodos de pago registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: metodos });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo métodos de pago", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo método de pago (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const metodosRepo = AppDataSource.getRepository(MetodosPago);

    const { nombre, monto, activo } = await req.json();

    if (!nombre || monto === undefined) {
      return NextResponse.json(
        { success: false, message: "El nombre y el monto son obligatorios" },
        { status: 400 }
      );
    }

    const nuevoMetodo = metodosRepo.create({
      nombre,
      monto,
      activo: activo ?? true, // Si no se envía, se asigna `true` por defecto
    });

    const metodoGuardado = await metodosRepo.save(nuevoMetodo);

    return NextResponse.json(
      { success: true, data: metodoGuardado },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando método de pago", error },
      { status: 500 }
    );
  }
}
