import prisma from "@/lib/prisma";

/**
 * 📌 Obtener todos los usuarios
 */
export async function getAllUsers() {
  try {
    const usuarios = await prisma.usuarios.findMany();
    return usuarios.length
      ? { success: true, data: usuarios }
      : { success: false, message: "No hay usuarios registrados" };
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw new Error("Error obteniendo usuarios");
  }
}

/**
 * 📌 Obtener un usuario por ID
 */
export async function getUserById(id: number) {
  try {
    if (isNaN(id)) throw new Error("ID inválido");

    const usuario = await prisma.usuarios.findUnique({
      where: { id_usuario: id },
    });
    return usuario
      ? { success: true, data: usuario }
      : { success: false, message: "Usuario no encontrado" };
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw new Error("Error obteniendo usuario");
  }
}

/**
 * 📌 Crear un nuevo usuario
 */
export async function createUser(data: {
  nombre: string;
  nombre_usuario: string;
  correo_electronico: string;
  pin: string;
  password: string;
  rol: "Cajero" | "Mesero" | "Administrador";
}) {
  try {
    const { nombre, nombre_usuario, correo_electronico, pin, password, rol } =
      data;

    if (
      !nombre ||
      !nombre_usuario ||
      !correo_electronico ||
      !pin ||
      !password ||
      !rol
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    const nuevoUsuario = await prisma.usuarios.create({ data });
    return { success: true, data: nuevoUsuario };
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw new Error("Error creando usuario");
  }
}

/**
 * 📌 Actualizar un usuario por ID
 */
export async function updateUser(
  id: number,
  data: Partial<{
    nombre: string;
    nombre_usuario: string;
    correo_electronico: string;
    pin: string;
    password: string;
    rol: "Cajero" | "Mesero" | "Administrador";
  }>
) {
  try {
    if (isNaN(id)) throw new Error("ID inválido");

    const usuarioActualizado = await prisma.usuarios.update({
      where: { id_usuario: id },
      data,
    });

    return { success: true, data: usuarioActualizado };
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw new Error("Error actualizando usuario");
  }
}

/**
 * 📌 Eliminar un usuario por ID
 */
export async function deleteUser(id: number) {
  try {
    if (isNaN(id)) throw new Error("ID inválido");

    await prisma.usuarios.delete({ where: { id_usuario: id } });
    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw new Error("Error eliminando usuario");
  }
}
