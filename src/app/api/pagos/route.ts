import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todos los pagos (GET)
 */
export async function GET() {
  try {
    const pagos = await prisma.pagos.findMany({
      include: {
        comanda: true,
        metodo_pago: true,
      },
    });

    if (!pagos.length) {
      return NextResponse.json(
        { success: false, message: "No hay pagos registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pagos }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/pagos:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo pagos" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Registrar un nuevo pago (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { id_comanda, id_metodo_pago, fecha_hora } = await req.json();

    if (!id_comanda || !id_metodo_pago) {
      return NextResponse.json(
        {
          success: false,
          message: "Comanda y método de pago son obligatorios",
        },
        { status: 400 }
      );
    }

    const nuevoPago = await prisma.pagos.create({
      data: {
        id_comanda,
        id_metodo_pago,
        fecha_hora: fecha_hora ? new Date(fecha_hora) : new Date(),
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoPago },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/pagos:", error);
    return NextResponse.json(
      { success: false, message: "Error registrando pago" },
      { status: 500 }
    );
  }
}
