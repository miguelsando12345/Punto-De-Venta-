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
 * 📌 Obtener todas las mesas (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const mesasRepo = AppDataSource.getRepository(Mesas);
    const mesas = await mesasRepo.find();

    if (!mesas.length) {
      return NextResponse.json(
        { success: false, message: "No hay mesas registradas" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: mesas });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo mesas", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear una nueva mesa (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const mesasRepo = AppDataSource.getRepository(Mesas);

    const { nombre, descripcion, capacidad, disponible } = await req.json();

    // Verificar si el nombre de la mesa ya existe
    const existingMesa = await mesasRepo.findOne({ where: { nombre } });
    if (existingMesa) {
      return NextResponse.json(
        { success: false, message: "La mesa ya está registrada" },
        { status: 400 }
      );
    }

    // Crear una nueva mesa
    const mesa = mesasRepo.create({
      nombre,
      descripcion,
      capacidad,
      disponible,
    });

    // Guardar la mesa en la base de datos
    const mesaGuardada = await mesasRepo.save(mesa);

    return NextResponse.json(
      { success: true, data: mesaGuardada },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando mesa", error },
      { status: 500 }
    );
  }
}
