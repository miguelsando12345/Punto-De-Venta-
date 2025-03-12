import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

// Definir la interfaz para Producto
interface Producto {
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

// Definir el tipo de estado según el enum de Prisma
type EstadoComanda =
  | "Pendiente"
  | "Preparando"
  | "Lista"
  | "Entregado"
  | "Cancelado";

/**
 * 📌 Crear una nueva comanda (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const {
      id_mesa,
      id_usuario,
      id_cliente,
      estado,
      productos,
    }: {
      id_mesa: number;
      id_usuario: number;
      id_cliente: number;
      estado: EstadoComanda; // Tipo para `estado`
      productos: Producto[];
    } = await req.json();

    // Validar que todos los campos necesarios estén presentes
    if (
      !id_mesa ||
      !id_usuario ||
      !id_cliente ||
      !estado ||
      !productos ||
      productos.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Todos los campos son obligatorios" },
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

    // Crear la comanda
    const nuevaComanda = await prisma.comandas.create({
      data: {
        id_mesa,
        id_usuario,
        id_cliente,
        estado, // El estado ahora es un valor válido
      },
    });

    // Crear los detalles de la comanda
    const detallesComanda = await prisma.detalleComanda.createMany({
      data: productos.map((producto: Producto) => ({
        id_comanda: nuevaComanda.id_comanda,
        id_producto: producto.id_producto,
        cantidad: producto.cantidad,
        precio_unitario: producto.precio_unitario,
      })),
    });

    // Obtener los productos y sus insumos
    for (const producto of productos) {
      const productosInsumo = await prisma.productosInsumo.findMany({
        where: {
          id_producto: producto.id_producto,
        },
      });

      // Restar los insumos del inventario
      for (const insumo of productosInsumo) {
        const cantidadNecesaria = insumo.cantidad_requerida * producto.cantidad;

        const inventario = await prisma.inventario.findUnique({
          where: { id_insumo: insumo.id_insumo },
        });

        if (inventario && inventario.unidad_disponible >= cantidadNecesaria) {
          await prisma.inventario.update({
            where: { id_insumo: insumo.id_insumo },
            data: {
              unidad_disponible:
                inventario.unidad_disponible - cantidadNecesaria,
            },
          });
        } else {
          // Si no hay suficiente inventario, puedes lanzar un error
          return NextResponse.json(
            {
              success: false,
              message: `No hay suficiente inventario para el insumo ${inventario?.nombre}`,
            },
            { status: 400 }
          );
        }
      }
    }

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
