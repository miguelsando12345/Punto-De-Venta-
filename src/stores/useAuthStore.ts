import { create } from "zustand";

interface AuthState {
  user: any | null;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

<<<<<<< HEAD
export default useAuthStore;
=======
export default useAuthStore;
>>>>>>> 9b7247a19df9d81c6c2911b354a89e8dd5895104
