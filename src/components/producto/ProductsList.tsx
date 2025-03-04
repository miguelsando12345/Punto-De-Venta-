import { useState } from "react";
import ProductCard from "@/components/producto/ProductCard";
import DeleteProductModal from "@/components/producto/DeleteProductModal";
import { Producto } from "@/types";

export default function ProductsList() {
  const [productos, setProductos] = useState<Producto[]>([
    { id: 1, nombre: "Producto 1", precio: 100 },
    { id: 2, nombre: "Producto 2", precio: 200 },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | undefined>(
    undefined
  );

  const handleDelete = () => {
    if (productToDelete !== undefined) {
      setProductos(productos.filter((p) => p.id !== productToDelete));
      setModalOpen(false);
      setProductToDelete(undefined);
    }
  };

  return (
    <div>
      {productos.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => {}}
          onDelete={(id) => {
            setProductToDelete(id);
            setModalOpen(true);
          }}
        />
      ))}
      <DeleteProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
