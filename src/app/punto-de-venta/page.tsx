"use client";

import React, { useState } from "react";
import CategoriasList from "@/components/post/CategoriasList";
import MesasSelector from "@/components/post/MesasSelector";
import { Comanda } from "@/types";

const PuntoDeVenta = () => {
  // Estado para manejar la nueva comanda
  const [comanda, setComanda] = useState<Comanda | null>(null);

  // Función que se pasa como prop a MesasSelector para recibir la nueva comanda
  const handleComandaCreada = (nuevaComanda: Comanda) => {
    setComanda(nuevaComanda);
    console.log("Comanda creada: ", nuevaComanda);
  };

  return (
    <div className="punto-de-venta p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Punto de Venta</h1>

      {/* Selector de Mesas con la función onComandaCreada */}
      <MesasSelector onComandaCreada={handleComandaCreada} />

      {/* Lista de Categorías */}
      <CategoriasList />

      {/* Mostrar comanda seleccionada */}
      {comanda && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold">Comanda Creada</h3>
          <p>ID de la Mesa: {comanda.id_mesa}</p>
          <p>Estado: {comanda.estado}</p>
        </div>
      )}
    </div>
  );
};

export default PuntoDeVenta;
