import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { correo_electronico, password, nombre, nombre_usuario, pin, rol } =
      await req.json();

    // Verifica que el rol sea válido
    const rolesValidos = ["Cajero", "Mesero", "Administrador"];
    if (!rolesValidos.includes(rol)) {
      return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { correo_electronico },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        correo_electronico,
        password: hashedPassword,
        nombre,
        nombre_usuario,
        pin,
        rol,
      },
    });

    // Crear token JWT
    const token = jwt.sign(
      {
        id: nuevoUsuario.id_usuario,
        correo_electronico: nuevoUsuario.correo_electronico,
        rol: nuevoUsuario.rol,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { message: "Usuario creado exitosamente", user: nuevoUsuario, token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
