import { useState } from "react";
import ClienteCard from "@/components/clientes/ClienteCard";
import DeleteClienteModal from "@/components/clientes/DeleteClienteModal";
import { Cliente } from "@/types";

export default function ClientesList() {
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, nombre: "Juan Pérez", telefono: "555-1234" },
    { id: 2, nombre: "María López", telefono: "555-5678" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<number | undefined>(
    undefined
  );

  const handleDelete = () => {
    if (clienteToDelete !== undefined) {
      setClientes(clientes.filter((c) => c.id !== clienteToDelete));
      setModalOpen(false);
      setClienteToDelete(undefined);
    }
  };

  return (
    <div>
      {clientes.map((cliente) => (
        <ClienteCard
          key={cliente.id}
          cliente={cliente}
          onEdit={() => {}}
          onDelete={(id) => {
            setClienteToDelete(id);
            setModalOpen(true);
          }}
        />
      ))}
      <DeleteClienteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
