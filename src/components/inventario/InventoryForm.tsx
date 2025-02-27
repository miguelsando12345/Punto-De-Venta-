import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createProducto } from "@/app/api/inventario";

const InventoryForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [producto, setProducto] = useState({
    productoId: "",
    cantidad: 0,
    costoUnitario: 0,
    valorTotal: 0,
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProducto(producto);
    if (onSuccess) onSuccess(); // Cierra el modal
    router.refresh(); // Refresca la lista de productos
  };

  return (
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
          setProducto({ ...producto, cantidad: Number(e.target.value) })
        }
        required
      />
      <Input
        type="number"
        placeholder="Costo Unitario"
        value={producto.costoUnitario}
        onChange={(e) =>
          setProducto({ ...producto, costoUnitario: Number(e.target.value) })
        }
        required
      />
      <Input
        type="number"
        placeholder="Valor Total"
        value={producto.valorTotal}
        onChange={(e) =>
          setProducto({ ...producto, valorTotal: Number(e.target.value) })
        }
        required
      />
      <Button type="submit" className="w-full">
        Agregar Producto
      </Button>
    </form>
  );
};

export default InventoryForm;
