import { create } from "zustand";

interface AuthState {
  user: { id: string; name: string } | null; // Replace with the actual structure of your user object
  login: (user: { id: string; name: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
