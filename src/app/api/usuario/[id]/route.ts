import { AppDataSource } from "@/lib/data-source";
import { Usuario } from "@/entities/Usuario";
import { NextRequest, NextResponse } from "next/server";

/**
 * Obtener todos los usuarios
 */
export async function GET(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const usuarios = await usuarioRepo.find();  // Cambié findOneBy por find()

    if (!usuarios.length) {
      return NextResponse.json(
        { success: false, message: "No hay usuarios registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: usuarios });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo usuarios", error },
      { status: 500 }
    );
  }
}

/**
 * Obtener un usuario por ID
 */
export async function GET_ONE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const usuario = await usuarioRepo.findOneBy({ id: Number(params.id) });

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
 * Crear un nuevo usuario (POST)
 */
export async function POST(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    // Obtener los datos del body
    const { nombre, email, direccion, telefono, imagenUrl, password, activo } =
      await req.json();

    // Crear una nueva instancia de Usuario
    const usuario = usuarioRepo.create({
      nombre,
      email,
      direccion,
      telefono,
      imagenUrl,
      password,
      activo,
    });

    // Guardar el nuevo usuario en la base de datos
    const usuarioGuardado = await usuarioRepo.save(usuario);

    return NextResponse.json({ success: true, data: usuarioGuardado }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando usuario", error },
      { status: 500 }
    );
  }
}

/**
 * Actualizar un usuario por ID (PUT)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    // Validar que el ID sea un número válido
    const usuarioId = Number(params.id);
    if (isNaN(usuarioId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    // Buscar el usuario en la base de datos
    const usuario = await usuarioRepo.findOneBy({ id: usuarioId });

    if (!usuario) {
      return NextResponse.json(
        { success: false, message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Obtener datos del body
    const { nombre, email, direccion, telefono, imagenUrl, activo, password } =
      await req.json();

    // Actualizar solo los campos proporcionados
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
 * Eliminar un usuario por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    // Validar que el ID sea un número válido
    const usuarioId = Number(params.id);
    if (isNaN(usuarioId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    // Buscar el usuario en la base de datos
    const usuario = await usuarioRepo.findOneBy({ id: usuarioId });

    if (!usuario) {
      return NextResponse.json(
        { success: false, message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar el usuario
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
