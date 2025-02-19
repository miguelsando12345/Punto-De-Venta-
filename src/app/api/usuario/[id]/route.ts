import { NextRequest, NextResponse } from "next/server";
import { Usuario } from "@/entities/Usuario";
import { AppDataSource } from "@/lib/data-source";

/**
 * Obtener un usuario por ID
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await AppDataSource.initialize();
    const usuarioRepo = db.getRepository(Usuario);
    const usuario = await usuarioRepo.findOneBy({ id: Number(params.id) });

    if (!usuario) {
      return NextResponse.json({ success: false, message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: usuario });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error obteniendo usuario", error }, { status: 500 });
  }
}

/**
 * Actualizar un usuario por ID
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { nombre, email, password, rol } = await req.json();
    const db = await AppDataSource.initialize();
    const usuarioRepo = db.getRepository(Usuario);

    let usuario = await usuarioRepo.findOneBy({ id: Number(params.id) });

    if (!usuario) {
      return NextResponse.json({ success: false, message: "Usuario no encontrado" }, { status: 404 });
    }

    usuarioRepo.merge(usuario, { nombre, email, password, rol });
    await usuarioRepo.save(usuario);

    return NextResponse.json({ success: true, data: usuario });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error actualizando usuario", error }, { status: 500 });
  }
}

/**
 * Eliminar un usuario por ID
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await AppDataSource.initialize();
    const usuarioRepo = db.getRepository(Usuario);
    const usuario = await usuarioRepo.findOneBy({ id: Number(params.id) });

    if (!usuario) {
      return NextResponse.json({ success: false, message: "Usuario no encontrado" }, { status: 404 });
    }

    await usuarioRepo.remove(usuario);
    return NextResponse.json({ success: true, message: "Usuario eliminado" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error eliminando usuario", error }, { status: 500 });
  }
}
