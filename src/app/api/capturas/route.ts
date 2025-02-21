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
 * 📌 Obtener todas las capturas (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const capturasRepo = AppDataSource.getRepository(Capturas);
    const capturas = await capturasRepo.find();

    if (!capturas.length) {
      return NextResponse.json(
        { success: false, message: "No hay capturas registradas" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: capturas });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo capturas", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear una nueva captura (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const capturasRepo = AppDataSource.getRepository(Capturas);

    const { tipoCaptura, descripcion, urlArchivo, activo } = await req.json();

    // Crear una nueva captura
    const captura = capturasRepo.create({
      tipoCaptura,
      descripcion,
      urlArchivo,
      activo,
    });

    // Guardar la captura en la base de datos
    const capturaGuardada = await capturasRepo.save(captura);

    return NextResponse.json(
      { success: true, data: capturaGuardada },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando captura", error },
      { status: 500 }
    );
  }
}
