"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCartStore, CartItem, Producto } from "@/stores/useCartStore";

interface Categoria {
  id_categoria: number;
  nombre: string;
}

export default function ProductosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mesaId = searchParams.get("mesa") || "";

  const {
    carts,
    addProduct,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCartStore();

  const currentCart: CartItem[] = carts[mesaId] || [];

  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    number | null
  >(null);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get("/api/producto"),
          axios.get("/api/categoria-productos"),
        ]);

        if (prodRes.data.success && catRes.data.success) {
          setProductos(prodRes.data.data);
          setCategorias(catRes.data.data);
          setCategoriaSeleccionada(catRes.data.data[0]?.id_categoria || null);
        } else {
          setError("Error al obtener productos o categorías.");
        }
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRegresar = () => router.back();

  const handleConfirm = async () => {
    try {
      if (!mesaId) {
        alert("No se ha seleccionado una mesa.");
        return;
      }

      // Preparar payload para el backend
      const payload = {
        id_mesa: Number(mesaId),
        id_usuario: 1, // Ajusta según el usuario logueado
        id_cliente: 1, // Ajusta según el cliente si es necesario
        estado: "Pendiente", // Estado inicial de la comanda
        detalle_comanda: currentCart.map((item) => ({
          id_producto: item.producto.id_producto,
          cantidad: item.quantity,
          precio_unitario: item.producto.precio,
        })),
      };

      console.log(payload); // Verifica el contenido del payload

      // Realizar la petición POST para crear la comanda
      const response = await axios.post("/api/comandas", payload);

      if (response.data.success) {
        // Si la comanda se guarda correctamente, vaciar el carrito y redirigir
        clearCart(mesaId);
        router.push("/punto-de-venta");
      } else {
        console.error("Error al guardar comanda:", response.data.message);
        alert("No se pudo guardar la comanda.");
      }
    } catch (error) {
      console.error("Error en la confirmación:", error);
      alert("Ocurrió un error al guardar la comanda.");
    }
  };

  const productosFiltrados = productos.filter(
    (p) =>
      (categoriaSeleccionada === null ||
        p.categoria_id === categoriaSeleccionada) &&
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading)
    return <div className="p-4 text-white">Cargando productos...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Mesa {mesaId} · Menú
      </h1>

      {/* Carrito */}
      <div className="mb-8 bg-gray-800 p-5 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">🛒 Carrito Actual</h2>
        {currentCart.length === 0 ? (
          <p className="text-gray-400">No hay productos en esta mesa.</p>
        ) : (
          <ul className="space-y-3">
            {currentCart.map((item, idx) => (
              <li
                key={`${item.producto.id_producto}-${idx}`}
                className="bg-gray-900 p-3 rounded-lg flex justify-between items-center"
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
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded-full"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      incrementQuantity(mesaId, item.producto.id_producto)
                    }
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded-full"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      removeProduct(mesaId, item.producto.id_producto)
                    }
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Menú de categorías */}
      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        {categorias.map((cat) => (
          <button
            key={cat.id_categoria}
            className={`px-5 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
              cat.id_categoria === categoriaSeleccionada
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setCategoriaSeleccionada(cat.id_categoria)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {productosFiltrados.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center">
            No hay productos disponibles.
          </p>
        ) : (
          productosFiltrados.map((prod) => (
            <div
              key={prod.id_producto}
              className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-lg font-bold">{prod.nombre}</h2>
              <p className="text-sm text-gray-400">
                {prod.descripcion || "Sin descripción"}
              </p>
              <p className="mt-2 font-semibold text-blue-400">${prod.precio}</p>
              <button
                className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition"
                onClick={() => addProduct(mesaId, prod)}
              >
                Añadir al carrito
              </button>
            </div>
          ))
        )}
      </div>

      {/* Botones inferiores */}
      <div className="mt-10 flex justify-center gap-6">
        <button
          onClick={handleRegresar}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl text-white transition"
        >
          ⬅️ Regresar
        </button>
        {currentCart.length > 0 && (
          <button
            onClick={handleConfirm}
            className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl text-white transition font-semibold"
          >
            ✅ Confirmar Orden
          </button>
        )}
      </div>
    </div>
  );
}
