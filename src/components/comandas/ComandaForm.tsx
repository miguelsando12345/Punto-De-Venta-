import { useState } from "react";
import { Comanda } from "@/types";

interface ComandaFormProps {
  onSave: (comanda: Comanda) => void;
}

export default function ComandaForm({ onSave }: ComandaFormProps) {
  const [mesa, setMesa] = useState("");
  const [total, setTotal] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ id: Date.now(), mesa: parseInt(mesa), total: parseFloat(total) });
    setMesa("");
    setTotal("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="number"
        placeholder="Número de Mesa"
        value={mesa}
        onChange={(e) => setMesa(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        placeholder="Total"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Guardar
      </button>
    </form>
  );
}
