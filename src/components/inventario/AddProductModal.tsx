// src/components/inventario/AddProductModal.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createProducto } from "@/app/api/inventario";

const AddProductModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [producto, setProducto] = useState({
    productoId: "",
    cantidad: "",
    costoUnitario: "",
    valorTotal: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convertir valores numéricos correctamente
    const data = {
      productoId: Number(producto.productoId),
      cantidad: Number(producto.cantidad),
      costoUnitario: parseFloat(producto.costoUnitario),
      valorTotal: parseFloat(producto.valorTotal),
    };

    await createProducto(data);
    setOpen(false); // Cierra el modal después de agregar
    router.refresh(); // Refresca la tabla
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>Agregar Producto al Inventario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            placeholder="ID del Producto"
            value={producto.productoId}
            onChange={(e) =>
              setProducto({ ...producto, productoId: e.target.value })
            }
            required
          />
          <Input
            type="number"
            placeholder="Cantidad"
            value={producto.cantidad}
            onChange={(e) =>
              setProducto({ ...producto, cantidad: e.target.value })
            }
            required
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Costo Unitario"
            value={producto.costoUnitario}
            onChange={(e) =>
              setProducto({ ...producto, costoUnitario: e.target.value })
            }
            required
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Valor Total"
            value={producto.valorTotal}
            onChange={(e) =>
              setProducto({ ...producto, valorTotal: e.target.value })
            }
            required
          />
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Agregar Producto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
