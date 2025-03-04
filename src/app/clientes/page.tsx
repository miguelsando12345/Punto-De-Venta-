import ClientesList from "@/components/clientes/ClientesList";
import ClienteForm from "@/components/clientes/ClienteForm";
import { Cliente } from "@/types";

export default function ClientesPage() {
  const handleSave = (cliente: Cliente) => {
    console.log("Cliente guardado:", cliente);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      <ClienteForm onSave={handleSave} />
      <ClientesList />
    </div>
  );
}
