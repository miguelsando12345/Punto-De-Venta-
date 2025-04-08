"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCartStore, CartItem, Producto } from "@/stores/useCartStore";

export default function ProductosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mesaId = searchParams.get("mesa") || "";

  // Obtenemos los métodos para manejar el carrito de la mesa
  const {
    carts,
    addProduct,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCartStore();

  // El carrito específico de la mesa actual
  const currentCart: CartItem[] = carts[mesaId] || [];

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 1. Obtener la lista de productos de /api/producto
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/producto");
        if (res.data.success) {
          setProductos(res.data.data);
        } else {
          setError(res.data.message || "Error al obtener productos");
        }
      } catch (err) {
        console.error("Error obteniendo productos:", err);
        setError("Ocurrió un error al obtener productos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // 2. Función para regresar a la página anterior
  const handleRegresar = () => {
    router.back();
  };

  // 3. Confirmar la cuenta de esta mesa
  const handleConfirm = async () => {
    try {
      // Lógica para crear la comanda en tu backend
      console.log("Confirmar mesa", mesaId, "con items:", currentCart);

      // Ejemplo de envío al backend:
      // await axios.post("/api/comandas", {
      //   mesaId,
      //   items: currentCart,
      //   // ...comensales, id_usuario, etc.
      // });
      // Limpia el carrito de la mesa
      clearCart(mesaId);

      // Vuelve a la vista anterior
      router.push("/punto-de-venta");
    } catch (error) {
      console.error("Error confirmando productos:", error);
    }
  };

  if (loading)
    return <div className="p-4 text-white">Cargando productos...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">
        Mesa {mesaId} - Seleccionar Productos
      </h1>

      {/* Carrito de la mesa */}
      <div className="mb-6 bg-gray-700 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Carrito Actual</h2>
        {currentCart.length === 0 ? (
          <p className="text-gray-300">No hay productos en esta mesa.</p>
        ) : (
          <ul className="space-y-2">
            {currentCart.map((item, idx) => (
              <li
                key={`${item.producto.id_producto}-${idx}`}
                className="bg-gray-800 p-2 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{item.producto.nombre}</p>
                  <p className="text-sm text-gray-400">
                    ${item.producto.precio} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      decrementQuantity(mesaId, item.producto.id_producto)
                    }
                    className="px-2 bg-gray-600 rounded text-white"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      incrementQuantity(mesaId, item.producto.id_producto)
                    }
                    className="px-2 bg-gray-600 rounded text-white"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      removeProduct(mesaId, item.producto.id_producto)
                    }
                    className="px-2 bg-red-600 rounded text-white"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lista de productos disponibles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productos.map((prod) => (
          <div
            key={prod.id_producto}
            className="bg-gray-700 p-4 rounded shadow"
          >
            <h2 className="text-lg font-bold">{prod.nombre}</h2>
            <p className="text-sm text-gray-300">
              {prod.descripcion || "Sin descripción"}
            </p>
            <p className="mt-2 font-semibold">${prod.precio}</p>
            <button
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => addProduct(mesaId, prod)}
            >
              Añadir
            </button>
          </div>
        ))}
      </div>

      {/* Botones para regresar o confirmar */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleRegresar}
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
        >
          Regresar
        </button>
        {currentCart.length > 0 && (
          <button
            onClick={handleConfirm}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
}
