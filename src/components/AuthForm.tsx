"use client";
import { useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo_electronico: correoElectronico,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error desconocido al iniciar sesión");
      }

      // Guarda el usuario en el store; el token ya se almacena en la cookie HttpOnly
      login(data.user);

      // Redirige según el rol del usuario
      if (data.user.rol === "Administrador") {
        const targetPath =
          localStorage.getItem("redirectPath") || "/administracion";
        router.push(targetPath);
      } else if (data.user.rol === "Cajero") {
        router.push("/caja");
      } else if (data.user.rol === "Mesero") {
        router.push("/punto-de-venta");
      } else {
        throw new Error("Rol de usuario no reconocido");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error en el login:", err);
      } else {
        setError("Error desconocido");
        console.error("Error en el login:", err);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg shadow-md w-80"
    >
      <h2 className="text-white text-xl font-semibold">Iniciar sesión</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        placeholder="Correo electrónico"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
        className="border p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded bg-gray-700 text-white"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
