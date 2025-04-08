"use client";

import * as React from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Producto } from "@/types";

interface AddProductsModalProps {
  mesaId: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedProducts: Producto[]) => void;
}

export function AddProductsModal({
  mesaId,
  isOpen,
  onClose,
  onConfirm,
}: AddProductsModalProps) {
  const [products, setProducts] = React.useState<Producto[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [selectedProducts, setSelectedProducts] = React.useState<Producto[]>(
    []
  );

  React.useEffect(() => {
    if (isOpen) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const res = await axios.get("/api/producto");
          if (res.data.success) {
            setProducts(res.data.data);
          } else {
            setError(res.data.message || "Error al obtener productos");
          }
        } catch (err) {
          console.error("Error fetching products:", err);
          setError("Ocurrió un error al obtener productos");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    } else {
      // Reiniciamos el estado cuando se cierra el modal
      setSelectedProducts([]);
      setProducts([]);
      setError("");
    }
  }, [isOpen]);

  const handleSelectProduct = (product: Producto) => {
    const exists = selectedProducts.find(
      (p) => p.id_producto === product.id_producto
    );
    if (exists) {
      setSelectedProducts((prev) =>
        prev.filter((p) => p.id_producto !== product.id_producto)
      );
    } else {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedProducts);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir Productos a la Mesa {mesaId}</DialogTitle>
          <DialogDescription>
            Selecciona los productos que deseas agregar a la cuenta.
          </DialogDescription>
        </DialogHeader>
        {loading && (
          <p className="text-sm text-gray-400">Cargando productos...</p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="max-h-64 overflow-y-auto space-y-2 mt-2">
            {products.map((prod) => {
              const isSelected = !!selectedProducts.find(
                (p) => p.id_producto === prod.id_producto
              );
              return (
                <div
                  key={prod.id_producto}
                  className={`cursor-pointer border p-2 rounded flex justify-between ${
                    isSelected
                      ? "bg-blue-50 border-blue-400"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelectProduct(prod)}
                >
                  <div>
                    <p className="font-semibold">{prod.nombre}</p>
                    <p className="text-sm text-gray-500">${prod.precio}</p>
                  </div>
                  {isSelected && (
                    <span className="text-blue-600 font-bold">
                      Seleccionado
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
