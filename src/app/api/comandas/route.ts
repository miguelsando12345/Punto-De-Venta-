import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todas las comandas (GET)
 */
export async function GET() {
  try {
    const comandas = await prisma.comandas.findMany({
      include: {
        usuario: true,
        cliente: true,
        mesa: true,
        detalle_comanda: true,
        facturas: true,
        pagos: true,
      },
    });

    if (!comandas.length) {
      return NextResponse.json(
        { success: false, message: "No hay comandas registradas" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: comandas },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/comandas:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo comandas" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear una nueva comanda (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { id_mesa, id_usuario, id_cliente, estado } = await req.json();

    if (!id_mesa || !id_usuario || !id_cliente || !estado) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const nuevaComanda = await prisma.comandas.create({
      data: {
        id_mesa,
        id_usuario,
        id_cliente,
        estado,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevaComanda },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/comandas:", error);
    return NextResponse.json(
      { success: false, message: "Error creando comanda" },
      { status: 500 }
    );
  }
}
