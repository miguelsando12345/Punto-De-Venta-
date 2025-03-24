"use client";
import { useState } from "react";
import useAuthStore from "@/stores/useAuthStore";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) login(data.user, data.token);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
<<<<<<< HEAD
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2" />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} className="border p-2" />
      <button type="submit" className="bg-blue-500 text-white p-2">Iniciar sesión</button>
    </form>
  );
}
=======
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Iniciar sesión
      </button>
    </form>
  );
}
>>>>>>> 9b7247a19df9d81c6c2911b354a89e8dd5895104
