"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchInventario, deleteProducto } from "@/app/api/inventario";

interface Producto {
  id: number;
  productoId: string;
  cantidad: number;
  costoUnitario: string;
  valorTotal: string;
}

const InventoryTable = () => {
  const [inventario, setInventario] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadInventario() {
      const data = await fetchInventario();
      if (data.success) setInventario(data.data);
      setLoading(false);
    }
    loadInventario();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
      await deleteProducto(id);
      setInventario(inventario.filter((p) => p.id !== id));
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Inventario</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2 text-left">Producto</th>
            <th className="p-2 text-left">Cantidad</th>
            <th className="p-2 text-left">Costo Unitario</th>
            <th className="p-2 text-left">Valor Total</th>
            <th className="p-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((producto) => (
            <tr key={producto.id} className="border-b dark:border-gray-700">
              <td className="p-2">{producto.productoId}</td>
              <td className="p-2">{producto.cantidad}</td>
              <td className="p-2">${producto.costoUnitario}</td>
              <td className="p-2">${producto.valorTotal}</td>
              <td className="p-2 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/inventario/edit/${producto.id}`)
                  }
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(producto.id)}
                >
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
