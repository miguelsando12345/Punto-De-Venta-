import React from "react";

interface HeaderPuntoDeVentaProps {
  nombre: string | null;
}

const HeaderPuntoDeVenta: React.FC<HeaderPuntoDeVentaProps> = ({ nombre }) => {
  return (
    <header className="bg-gray-900 p-4 text-white text-center">
      <h1 className="text-2xl font-semibold">
        {nombre ? `Bienvenido, ${nombre}` : "Cargando..."}
      </h1>
    </header>
  );
};

export default HeaderPuntoDeVenta;
