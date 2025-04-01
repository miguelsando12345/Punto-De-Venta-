"use client";

import React, { useEffect, useState } from "react";
import { getCategorias } from "@/services/categoria-productos.api";
import { CategoriaProducto, Producto, Comanda } from "@/types";
import ProductosSelector from "@/components/post/ProductosSelector";
import { crearComanda } from "@/services/comanda.api";

const CategoriasList = () => {
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [comanda, setComanda] = useState<Comanda | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await getCategorias();
        setCategorias(categoriasData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleCategoriaClick = (categoriaId: number) => {
    setSelectedCategoria((prevSelected) =>
      prevSelected === categoriaId ? null : categoriaId
    );
    setSearchTerm(""); // Reset search when selecting a category
  };

  const filteredProductos = (categoria: CategoriaProducto) => {
    return categoria.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleCrearComanda = async () => {
    // Asumiendo que la comanda es creada al seleccionar la mesa y los detalles del pedido
    const nuevaComanda: Omit<Comanda, "id_comanda"> = {
      id_mesa: 1, // Aquí podrías tomar el ID de la mesa seleccionada
      id_usuario: 1, // Usuario que realiza el pedido
      id_cliente: 1, // Cliente asociado a la comanda
      estado: "Pendiente", // Estado inicial
      detalle_comanda: [],
    };

    try {
      const data = await crearComanda(nuevaComanda);
      setComanda(data); // Guardar la comanda creada
    } catch (error) {
      console.error("Error al crear la comanda", error);
      alert("Hubo un error al crear la comanda");
    }
  };

  if (loading)
    return <div className="text-center text-xl">Cargando menú...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center text-white mb-4">Menú</h2>

      {/* Botón para crear la comanda, solo se muestra si no hay una comanda activa */}
      {!comanda && (
        <button
          onClick={handleCrearComanda}
          className="w-full p-4 bg-blue-600 text-white rounded-lg"
        >
          Crear Comanda
        </button>
      )}

      <div className="space-y-4 mt-6">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className="p-6 rounded-2xl bg-gray-800 shadow-lg border-4 border-gray-600"
          >
            <button
              onClick={() => handleCategoriaClick(categoria.id)}
              className="w-full text-left text-lg font-semibold p-4 bg-blue-600 rounded-2xl border-4 border-blue-400 hover:bg-blue-700 transition-all text-white"
            >
              {categoria.nombre}
            </button>
            {selectedCategoria === categoria.id && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 mb-3 rounded-lg border-2 border-gray-500 text-black"
                />
                <div className="space-y-2">
                  {filteredProductos(categoria).map((producto) => (
                    <button
                      key={producto.id}
                      className="w-full flex justify-between p-4 bg-gray-700 rounded-2xl border-4 border-gray-500 hover:bg-gray-600 transition-all text-white"
                    >
                      <span>{producto.nombre}</span>
                      <span className="text-green-400 font-semibold">
                        ${producto.precio.toFixed(2)}
                      </span>
                    </button>
                  ))}
                  {filteredProductos(categoria).length === 0 && (
                    <p className="text-gray-400 text-center">
                      No hay productos disponibles
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mostrar selector de productos solo si hay una comanda activa */}
      {comanda && selectedCategoria && (
        <ProductosSelector
          comanda={comanda}
          categoriaId={selectedCategoria}
          productos={filteredProductos(
            categorias.find((categoria) => categoria.id === selectedCategoria)!
          )}
        />
      )}
    </div>
  );
};

export default CategoriasList;
