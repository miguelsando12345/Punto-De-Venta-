import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
<<<<<<< HEAD
    const { correo_electronico, password } = await req.json();

    // Buscar el usuario por correo electrónico
    const user = await prisma.usuarios.findUnique({ where: { correo_electronico } });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id_usuario, correo_electronico: user.correo_electronico },
      SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ message: "Login exitoso", token, user }, { status: 200 });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
=======
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { message: "Login exitoso", token, user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
>>>>>>> 9b7247a19df9d81c6c2911b354a89e8dd5895104
  }
}
