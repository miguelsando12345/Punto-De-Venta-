import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Asegúrate de que prisma esté correctamente configurado
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!; // Asegúrate de que esta variable esté definida en tu archivo .env

export async function POST(req: Request) {
  try {
    const { correo_electronico, password, nombre, nombre_usuario, pin, rol } =
      await req.json();

    // Verifica que el rol sea válido
    const rolValido = ["Cajero", "Mesero", "Administrador"];
    if (!rolValido.includes(rol)) {
      return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
    }

    // Verifica si el correo electrónico o el nombre de usuario ya están registrados
    const existingUser = await prisma.usuarios.findFirst({
      where: {
        OR: [{ correo_electronico }, { nombre_usuario }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "El correo electrónico o el nombre de usuario ya están registrados",
        },
        { status: 400 }
      );
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario en la base de datos
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

    // Genera un token JWT
    const token = jwt.sign(
      {
        id: newUser.id_usuario,
        correo_electronico: newUser.correo_electronico,
        rol: newUser.rol,
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
