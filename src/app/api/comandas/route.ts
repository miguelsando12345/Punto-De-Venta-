import { AppDataSource } from "@/lib/data-source";
import { Comandas } from "@/entities/Comandas";
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
 * 📌 Obtener todas las comandas (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const comandasRepo = AppDataSource.getRepository(Comandas);
    const comandas = await comandasRepo.find();

    if (!comandas.length) {
      return NextResponse.json(
        { success: false, message: "No hay comandas registradas" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: comandas });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo comandas", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear una nueva comanda (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const comandasRepo = AppDataSource.getRepository(Comandas);

    const { mesaId, estado, total, fecha, notas, pagado, creadoEn, actualizadoEn } =
      await req.json();

    // Crear una nueva comanda
    const comanda = comandasRepo.create({
      mesaId,
      estado,
      total,
      fecha,
      notas,
      pagado,
      creadoEn,
      actualizadoEn,
    });

    // Guardar la comanda en la base de datos
    const comandaGuardada = await comandasRepo.save(comanda);

    return NextResponse.json(
      { success: true, data: comandaGuardada },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando comanda", error },
      { status: 500 }
    );
  }
}
