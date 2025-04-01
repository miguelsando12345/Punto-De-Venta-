import React, { useState } from "react";
import { Producto, Comanda, DetalleComanda } from "@/types";
import { agregarProductoAComanda } from "@/services/comanda.api";

interface ProductosSelectorProps {
  comanda: Comanda;
  categoriaId: number;
  productos: Producto[];
}

const ProductosSelector: React.FC<ProductosSelectorProps> = ({
  comanda,
  categoriaId,
  productos,
}) => {
  const [cantidad, setCantidad] = useState<number>(1);

  const handleAgregarProducto = async (producto: Producto) => {
    // Asigna un id_detalle temporal, por ejemplo un timestamp o un contador incremental
    const detalle: DetalleComanda = {
      id_detalle: Date.now(), // Genera un id temporal (usando timestamp)
      id_comanda: comanda.id_comanda,
      id_producto: producto.id,
      cantidad: cantidad,
      precio_unitario: producto.precio,
      producto: producto,
    };

    try {
      const data = await agregarProductoAComanda(detalle);
      alert("Producto agregado a la comanda");
    } catch (error) {
      console.error("Error al agregar el producto", error);
      alert("Hubo un error al agregar el producto");
    }
  };

  return (
    <div className="space-y-4">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
        >
          <div>
            <h4 className="text-lg text-white">{producto.nombre}</h4>
            <p className="text-gray-400">{producto.descripcion}</p>
            <p className="text-white">${producto.precio}</p>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-16 p-2 border-2 border-gray-500 rounded-lg text-black"
            />
            <button
              onClick={() => handleAgregarProducto(producto)}
              className="ml-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Agregar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductosSelector;
