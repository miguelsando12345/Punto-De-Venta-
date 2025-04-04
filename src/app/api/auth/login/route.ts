import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { correo_electronico, password } = await req.json();

    if (!correo_electronico || !password) {
      return NextResponse.json(
        { error: "Correo y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Buscar usuario en la base de datos usando el modelo Usuarios de tu schema
    const user = await prisma.usuarios.findUnique({
      where: { correo_electronico },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Crear token JWT con datos del usuario
    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        correo_electronico: user.correo_electronico,
        rol: user.rol,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    // Configuramos la respuesta y seteamos la cookie "token"
    const response = NextResponse.json({
      message: "Inicio de sesión exitoso",
      user,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hora en segundos
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
