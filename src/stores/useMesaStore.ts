// stores/useMesaStore.ts
import { create } from "zustand";
import { Mesa } from "@/types";

interface MesaState {
  mesaSeleccionada: Mesa | null;
  setMesaSeleccionada: (mesa: Mesa) => void;
  resetMesa: () => void;
}

const useMesaStore = create<MesaState>((set) => ({
  mesaSeleccionada: null,
  setMesaSeleccionada: (mesa: Mesa) => set({ mesaSeleccionada: mesa }),
  resetMesa: () => set({ mesaSeleccionada: null }),
}));

export default useMesaStore;
