import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { correo_electronico, password } = await req.json();

    // Buscar usuario por correo
    const usuario = await prisma.usuarios.findUnique({
      where: { correo_electronico },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Comparar la contraseña con la almacenada en la BD
    const contraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        correo_electronico: usuario.correo_electronico,
        rol: usuario.rol,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { message: "Login exitoso", token, user: usuario },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
