import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Definir la interfaz para Producto en la comanda
interface DetalleComandaInput {
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

type EstadoComanda =
  | "Pendiente"
  | "Preparando"
  | "Lista"
  | "Entregado"
  | "Cancelado";

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
      estado,
      detalle_comanda,
    }: {
      id_mesa: number;
      id_usuario: number;
      id_cliente: number;
      estado: EstadoComanda;
      detalle_comanda: DetalleComandaInput[];
    } = await req.json();

    // Validar que todos los campos obligatorios estén presentes
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

    // Verificar que el usuario exista
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { id_usuario },
    });
    if (!usuarioExistente) {
      return NextResponse.json(
        { success: false, message: `Usuario con id ${id_usuario} no existe` },
        { status: 400 }
      );
    }

    // Verificar que el cliente exista
    const clienteExistente = await prisma.clientes.findUnique({
      where: { id_cliente },
    });
    if (!clienteExistente) {
      return NextResponse.json(
        { success: false, message: `Cliente con id ${id_cliente} no existe` },
        { status: 400 }
      );
    }

    // Verificar que el estado sea válido
    const validEstados: EstadoComanda[] = [
      "Pendiente",
      "Preparando",
      "Lista",
      "Entregado",
      "Cancelado",
    ];
    if (!validEstados.includes(estado)) {
      return NextResponse.json(
        { success: false, message: "Estado no válido" },
        { status: 400 }
      );
    }

    // Crear la comanda (encabezado)
    const nuevaComanda = await prisma.comandas.create({
      data: {
        id_mesa,
        id_usuario,
        id_cliente,
        estado,
      },
    });

    // Crear los detalles de la comanda
    await prisma.detalleComanda.createMany({
      data: detalle_comanda.map((detalle) => ({
        id_comanda: nuevaComanda.id_comanda,
        id_producto: detalle.id_producto,
        cantidad: detalle.cantidad,
        precio_unitario: detalle.precio_unitario,
      })),
    });

    // Crear la factura sin necesidad del campo total
    await prisma.facturas.create({
      data: {
        id_comanda: nuevaComanda.id_comanda,
      },
    });

    // Crear un pago (opcional, si deseas agregar esta parte, sin 'total' ni 'metodo_pago')
    await prisma.pagos.create({
      data: {
        id_comanda: nuevaComanda.id_comanda,
        id_metodo_pago: 1,  // Puedes usar el ID de un método de pago existente, como 'Efectivo'
        fecha_hora: new Date(),  // Asignamos la fecha y hora actual
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
