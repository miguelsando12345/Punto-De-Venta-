import ComandasList from "@/components/comandas/ComandasList";
import ComandaForm from "@/components/comandas/ComandaForm";
import { Comanda } from "@/types";

export default function ComandasPage() {
  const handleSave = (comanda: Comanda) => {
    console.log("Comanda guardada:", comanda);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Comandas</h1>
      <ComandaForm onSave={handleSave} />
      <ComandasList />
    </div>
  );
}
