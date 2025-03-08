import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Obtener todos los usuarios (GET)
 */
export async function GET() {
  try {
    const usuarios = await prisma.usuarios.findMany();

    if (!usuarios.length) {
      return NextResponse.json(
        { success: false, message: "No hay usuarios registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: usuarios },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/usuario:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo usuarios" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo usuario (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const { nombre, nombre_usuario, correo_electronico, pin, password, rol } =
      await req.json();

    if (
      !nombre ||
      !nombre_usuario ||
      !correo_electronico ||
      !pin ||
      !password ||
      !rol
    ) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        nombre,
        nombre_usuario,
        correo_electronico,
        pin,
        password,
        rol,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoUsuario },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/usuario:", error);
    return NextResponse.json(
      { success: false, message: "Error creando usuario" },
      { status: 500 }
    );
  }
}
