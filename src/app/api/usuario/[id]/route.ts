import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener un usuario por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_usuario = parseInt(params.id);

    if (isNaN(id_usuario)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuarios.findUnique({ where: { id_usuario } });

    if (!usuario) {
      return NextResponse.json(
        { success: false, message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: usuario }, { status: 200 });
  } catch (error) {
    console.error("Error en GET /api/usuario/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo usuario" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un usuario por ID (PATCH)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_usuario = parseInt(params.id);

    if (isNaN(id_usuario)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const usuarioActualizado = await prisma.usuarios.update({
      where: { id_usuario },
      data: body,
    });

    return NextResponse.json(
      { success: true, data: usuarioActualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/usuario/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error actualizando usuario" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un usuario por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id_usuario = parseInt(params.id);

    if (isNaN(id_usuario)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.usuarios.delete({ where: { id_usuario } });

    return NextResponse.json(
      { success: true, message: "Usuario eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/usuario/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Error eliminando usuario" },
      { status: 500 }
    );
  }
}
