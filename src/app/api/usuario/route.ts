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
 * 📌 Obtener todos los usuarios (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const usuarios = await usuarioRepo.find();

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
 * 📌 Crear un nuevo usuario (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const usuarioRepo = AppDataSource.getRepository(Usuario);

    const { nombre, email, direccion, telefono, imagenUrl, password, activo } =
      await req.json();

    // Verificar si el email ya existe
    const existingUser = await usuarioRepo.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    // Crear un nuevo usuario
    const usuario = usuarioRepo.create({
      nombre,
      email,
      direccion,
      telefono,
      imagenUrl,
      password,
      activo,
    });

    // Guardar el usuario en la base de datos
    const usuarioGuardado = await usuarioRepo.save(usuario);

    return NextResponse.json(
      { success: true, data: usuarioGuardado },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando usuario", error },
      { status: 500 }
    );
  }
}
