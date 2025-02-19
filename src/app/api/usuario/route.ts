import { NextResponse } from "next/server";
import { AppDataSource } from "../../../lib/data-source";
import { Usuario } from "../../../entities/Usuario";

// Conectar la base de datos antes de manejar las peticiones
export async function connectDb() {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    throw new Error("Error al conectar a la base de datos");
  }
}

// Crear un nuevo usuario
export async function POST(request: Request) {
  const { nombre, email, password, rol } = await request.json();

  try {
    await connectDb();
    const usuario = new Usuario();
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.password = password;
    usuario.rol = rol || "usuario"; // Valor por defecto si no se proporciona rol

    const savedUser = await AppDataSource.manager.save(usuario);
    return NextResponse.json(savedUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el usuario", error }, { status: 500 });
  }
}

// Obtener todos los usuarios
export async function GET() {
  try {
    await connectDb();
    const usuarios = await AppDataSource.manager.find(Usuario);
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los usuarios", error }, { status: 500 });
  }
}
