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
    const rolValido = ["Cajero", "Mesero", "Administrador"];
    if (!rolValido.includes(rol)) {
      return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.usuarios.create({
      data: {
        correo_electronico,
        password: hashedPassword,
        nombre,
        nombre_usuario,
        pin,
        rol,
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id_usuario,
        correo_electronico: newUser.correo_electronico,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { message: "Usuario creado exitosamente", user: newUser, token },
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
