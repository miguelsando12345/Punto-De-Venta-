import React from "react";

interface HeaderPuntoDeVentaProps {
  nombre: string | null;
}

const HeaderPuntoDeVenta: React.FC<HeaderPuntoDeVentaProps> = ({ nombre }) => {
  return (
    <header className="bg-gray-900 p-4 text-white flex items-center justify-between shadow-md">
      <h1 className="text-2xl font-semibold">Punto de Venta</h1>
      <div className="flex items-center gap-3">
        <span className="text-lg font-medium">Usuario:</span>
        <span className="bg-gray-700 px-3 py-1 rounded-lg text-white font-semibold">
          {nombre ? nombre : "Cargando..."}
        </span>
      </div>
    </header>
  );
};

export default HeaderPuntoDeVenta;
