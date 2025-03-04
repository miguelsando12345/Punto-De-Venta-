import { useState } from "react";
import ComandaCard from "@/components/comandas/ComandaCard";
import DeleteComandaModal from "@/components/comandas/DeleteComandaModal";
import { Comanda } from "@/types";

export default function ComandasList() {
  const [comandas, setComandas] = useState<Comanda[]>([
    { id: 1, mesa: 3, total: 250 },
    { id: 2, mesa: 5, total: 180 },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [comandaToDelete, setComandaToDelete] = useState<number | undefined>(
    undefined
  );

  const handleDelete = () => {
    if (comandaToDelete !== undefined) {
      setComandas(comandas.filter((c) => c.id !== comandaToDelete));
      setModalOpen(false);
      setComandaToDelete(undefined);
    }
  };

  return (
    <div>
      {comandas.map((comanda) => (
        <ComandaCard
          key={comanda.id}
          comanda={comanda}
          onEdit={() => {}}
          onDelete={(id) => {
            setComandaToDelete(id);
            setModalOpen(true);
          }}
        />
      ))}
      <DeleteComandaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
