import { AppDataSource } from "@/lib/data-source";
import { Usuario } from "@/entities/Usuario";
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
 * 📌 Obtener un usuario por ID (GET)
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBConnection();
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const usuarioId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(usuarioId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const usuario = await usuarioRepo.findOneBy({ id: usuarioId });

    if (!usuario) {
      return NextResponse.json(
        { success: false, message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: usuario });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo usuario", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un usuario por ID (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    await ensureDBConnection();
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const usuarioId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(usuarioId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const usuario = await usuarioRepo.findOneBy({ id: usuarioId });

    if (!usuario) {
      return NextResponse.json(
        { success: false, message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const { nombre, email, direccion, telefono, imagenUrl, activo, password } =
      await req.json();

    usuarioRepo.merge(usuario, {
      nombre,
      email,
      direccion,
      telefono,
      imagenUrl,
      activo,
      password,
    });

    const usuarioActualizado = await usuarioRepo.save(usuario);

    return NextResponse.json({ success: true, data: usuarioActualizado });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando usuario", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un usuario por ID (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    await ensureDBConnection();
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const usuarioId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(usuarioId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const usuario = await usuarioRepo.findOneBy({ id: usuarioId });

    if (!usuario) {
      return NextResponse.json(
        { success: false, message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    await usuarioRepo.remove(usuario);

    return NextResponse.json({
      success: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando usuario", error },
      { status: 500 }
    );
  }
}
