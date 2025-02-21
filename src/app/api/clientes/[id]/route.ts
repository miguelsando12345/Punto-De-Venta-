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
 * 📌 Obtener un cliente por ID (GET)
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBConnection();
    const clienteRepo = AppDataSource.getRepository(Clientes); // Cambio a repositorio de clientes

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const clienteId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(clienteId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const cliente = await clienteRepo.findOneBy({ id: clienteId });

    if (!cliente) {
      return NextResponse.json(
        { success: false, message: "Cliente no encontrado" }, // Cambio del mensaje
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: cliente });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo cliente", error }, // Cambio del mensaje
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un cliente por ID (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    await ensureDBConnection();
    const clienteRepo = AppDataSource.getRepository(Clientes); // Cambio a repositorio de clientes

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const clienteId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(clienteId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const cliente = await clienteRepo.findOneBy({ id: clienteId });

    if (!cliente) {
      return NextResponse.json(
        { success: false, message: "Cliente no encontrado" }, // Cambio del mensaje
        { status: 404 }
      );
    }

    const { nombre, apellido, correo, direccion, telefono, activo } = await req.json();

    clienteRepo.merge(cliente, {
      nombre,
      apellido, // Cambio: ahora tiene apellido
      correo,
      direccion,
      telefono,
      activo,
    });

    const clienteActualizado = await clienteRepo.save(cliente);

    return NextResponse.json({ success: true, data: clienteActualizado });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando cliente", error }, // Cambio del mensaje
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un cliente por ID (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    await ensureDBConnection();
    const clienteRepo = AppDataSource.getRepository(Clientes); // Cambio a repositorio de clientes

    // Obtener ID desde la URL
    const urlParts = req.nextUrl.pathname.split("/");
    const clienteId = Number(urlParts[urlParts.length - 1]);

    if (isNaN(clienteId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const cliente = await clienteRepo.findOneBy({ id: clienteId });

    if (!cliente) {
      return NextResponse.json(
        { success: false, message: "Cliente no encontrado" }, // Cambio del mensaje
        { status: 404 }
      );
    }

    await clienteRepo.remove(cliente);

    return NextResponse.json({
      success: true,
      message: "Cliente eliminado correctamente", // Cambio del mensaje
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando cliente", error }, // Cambio del mensaje
      { status: 500 }
    );
  }
}
