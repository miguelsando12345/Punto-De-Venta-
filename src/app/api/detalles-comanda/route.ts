import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 Validar los detalles de la comanda
 */
const validarDetalleComanda = ({
  id_comanda,
  id_producto,
  cantidad,
  precio_unitario,
}: {
  id_comanda: string;
  id_producto: string;
  cantidad: number;
  precio_unitario: number;
}) => {
  if (!id_comanda || !id_producto || !cantidad || !precio_unitario) {
    return "Todos los campos son obligatorios";
  }

  if (cantidad <= 0 || precio_unitario <= 0) {
    return "La cantidad y el precio deben ser mayores a cero";
  }

  return null; // Si todo es válido
};

/**
 * 📌 Obtener todos los detalles de comandas (GET)
 */
export async function GET() {
  try {
    const detalles = await prisma.detalleComanda.findMany({
      include: {
        comanda: true,
        producto: true,
      },
    });

    if (!detalles.length) {
      return NextResponse.json(
        { success: false, message: "No hay detalles de comandas registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: detalles },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/detalles-comanda:", error);
    return NextResponse.json(
      { success: false, message: "Error obteniendo detalles de comandas" },
      { status: 500 }
    );
  }
}

/**
 * 📌 Crear un nuevo detalle de comanda (POST)
 */
export async function POST(req: NextRequest) {
  try {
    // Obtener el parámetro de la URL correctamente
    const url = new URL(req.url);
    const id_comanda = url.searchParams.get("id_comanda");

    // Asegurarse de que se recibió el parámetro
    if (!id_comanda) {
      return NextResponse.json(
        { success: false, message: "El parámetro id_comanda es obligatorio" },
        { status: 400 }
      );
    }

    // Obtener el cuerpo de la solicitud
    const { id_producto, cantidad, precio_unitario } = await req.json();

    // Validación de los datos
    const error = validarDetalleComanda({
      id_comanda,
      id_producto,
      cantidad,
      precio_unitario,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 400 }
      );
    }

    // Si todo es válido, proceder con el resto de la lógica (guardar en la base de datos, etc.)
    const nuevoDetalle = await prisma.detalleComanda.create({
      data: {
        id_comanda: Number(id_comanda), // Asegurarse de que id_comanda es un número
        id_producto,
        cantidad,
        precio_unitario,
      },
    });

    return NextResponse.json(
      { success: true, data: nuevoDetalle },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/detalles-comanda:", error);
    return NextResponse.json(
      { success: false, message: "Error creando detalle de comanda" },
      { status: 500 }
    );
  }
}
