import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Definir la interfaz para Producto en la comanda
interface DetalleComandaInput {
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

/**
 * 📌 Obtener todas las comandas (GET)
 */
export async function GET() {
  try {
    const comandas = await prisma.comandas.findMany({
      include: {
        usuario: true,
        cliente: true,
        mesa: true,
        detalle_comanda: true,
        facturas: true,
        pagos: true,
      },
    });

    if (!comandas.length) {
      return NextResponse.json(
        { success: false, message: "No hay comandas registradas" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: comandas },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/comandas:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo comandas" },
      { status: 500 }
    );
  }
}

/**
 * Crear una nueva comanda (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const {
      id_mesa,
      id_usuario,
      id_cliente,
      estado, // e.g. "Pendiente"
      detalle_comanda, // array de objetos { id_producto, cantidad, precio_unitario }
    } = await req.json();

    // Validación de campos
    if (
      !id_mesa ||
      !id_usuario ||
      !id_cliente ||
      !estado ||
      !detalle_comanda ||
      detalle_comanda.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Validar que el usuario y cliente existan
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { id_usuario },
    });
    if (!usuarioExistente) {
      return NextResponse.json(
        { success: false, message: `Usuario con id ${id_usuario} no existe` },
        { status: 400 }
      );
    }

    const clienteExistente = await prisma.clientes.findUnique({
      where: { id_cliente },
    });
    if (!clienteExistente) {
      return NextResponse.json(
        { success: false, message: `Cliente con id ${id_cliente} no existe` },
        { status: 400 }
      );
    }

    // 1. Crear la comanda
    const nuevaComanda = await prisma.comandas.create({
      data: {
        id_mesa,
        id_usuario,
        id_cliente,
        estado,
      },
    });

    // 2. Insertar los detalles (createMany)
    await prisma.detalleComanda.createMany({
      data: detalle_comanda.map((det: DetalleComandaInput) => ({
        id_comanda: nuevaComanda.id_comanda,
        id_producto: det.id_producto,
        cantidad: det.cantidad,
        precio_unitario: det.precio_unitario,
      })),
    });

    // 3. Crear la factura
    await prisma.facturas.create({
      data: {
        id_comanda: nuevaComanda.id_comanda,
      },
    });

    // 4. Crear el pago (usando id_metodo_pago = 1)
    //    Asegúrate de que haya un registro con id_metodo_pago=1 ("Efectivo") en BD
    await prisma.pagos.create({
      data: {
        id_comanda: nuevaComanda.id_comanda,
        id_metodo_pago: 1,
        fecha_hora: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, data: nuevaComanda },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/comandas:", error);
    return NextResponse.json(
      { success: false, message: "Error creando comanda" },
      { status: 500 }
    );
  }
}
