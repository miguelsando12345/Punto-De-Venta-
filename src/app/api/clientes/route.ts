import { AppDataSource } from "@/lib/data-source";
import { Clientes } from "@/entities/Clientes"; // Cambio a la entidad Clientes
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
 * 📌 Obtener todos los clientes (GET)
 */
export async function GET() {
  try {
    await ensureDBConnection();
    const clienteRepo = AppDataSource.getRepository(Clientes); // Cambio de repositorio
    const clientes = await clienteRepo.find(); // Obtener clientes

    if (!clientes.length) {
      return NextResponse.json(
        { success: false, message: "No hay clientes registrados" }, // Cambio del mensaje
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: clientes });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo clientes", error }, // Cambio del mensaje
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo cliente (POST)
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDBConnection();
    const clienteRepo = AppDataSource.getRepository(Clientes); // Cambio de repositorio

    const { nombre, apellido, correo, direccion, telefono, activo } = await req.json(); // Cambio a campos de cliente

    // Verificar si el correo ya existe
    const existingClient = await clienteRepo.findOne({ where: { correo } }); // Verificar por correo
    if (existingClient) {
      return NextResponse.json(
        { success: false, message: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    // Crear un nuevo cliente
    const cliente = clienteRepo.create({
      nombre,
      apellido, // Añadir apellido
      correo,
      direccion,
      telefono,
      activo,
    });

    // Guardar el cliente en la base de datos
    const clienteGuardado = await clienteRepo.save(cliente);

    return NextResponse.json(
      { success: true, data: clienteGuardado },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando cliente", error },
      { status: 500 }
    );
  }
}
