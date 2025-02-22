import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { DetalleComanda } from "@/entities/DetalleComanda";

/**
 * 📌 Asegura la conexión a la base de datos
 */
async function ensureDBConnection() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

/**
 * 📌 Obtener un detalle de comanda por ID (GET)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const detallesRepo = AppDataSource.getRepository(DetalleComanda);
    const detalle = await detallesRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!detalle) {
      return NextResponse.json(
        { success: false, message: "Detalle de comanda no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: detalle });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo detalle de comanda", error },
      { status: 500 }
    );
  }
}

/**
 * 📌 Actualizar un detalle de comanda por ID (PUT)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const detallesRepo = AppDataSource.getRepository(DetalleComanda);
    const detalle = await detallesRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!detalle) {
      return NextResponse.json(
        { success: false, message: "Detalle de comanda no encontrado" },
        { status: 404 }
      );
    }

    const { comandaId, productoId, cantidad, precioUnitario } =
      await req.json();

    if (comandaId) detalle.comandaId = comandaId;
    if (productoId) detalle.productoId = productoId;
    if (cantidad) detalle.cantidad = cantidad;
    if (precioUnitario) detalle.precioUnitario = precioUnitario;

    const detalleActualizado = await detallesRepo.save(detalle);

    return NextResponse.json({ success: true, data: detalleActualizado });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error actualizando detalle de comanda",
        error,
      },
      { status: 500 }
    );
  }
}

/**
 * 📌 Eliminar un detalle de comanda por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBConnection();
    const detallesRepo = AppDataSource.getRepository(DetalleComanda);
    const detalle = await detallesRepo.findOne({
      where: { id: Number(params.id) },
    });

    if (!detalle) {
      return NextResponse.json(
        { success: false, message: "Detalle de comanda no encontrado" },
        { status: 404 }
      );
    }

    await detallesRepo.remove(detalle);

    return NextResponse.json({
      success: true,
      message: "Detalle de comanda eliminado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando detalle de comanda", error },
      { status: 500 }
    );
  }
}
