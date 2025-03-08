import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener un cliente por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_cliente = parseInt(params.id);

    if (isNaN(id_cliente)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const cliente = await prisma.clientes.findUnique({
      where: { id_cliente },
      include: { comandas: true },
    });

    if (!cliente) {
      return NextResponse.json(
        { success: false, message: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: cliente }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/clientes/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo cliente" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un cliente por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_cliente = parseInt(params.id);

    if (isNaN(id_cliente)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const clienteActualizado = await prisma.clientes.update({
      where: { id_cliente },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: clienteActualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/clientes/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando cliente" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un cliente por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_cliente = parseInt(params.id);

    if (isNaN(id_cliente)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.clientes.delete({ where: { id_cliente } });

    return NextResponse.json(
      { success: true, message: "Cliente eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/clientes/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando cliente" },
      { status: 500 }
    );
  }
}
