"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Caja() {
  const [montoRecibido, setMontoRecibido] = useState(0);
  const total = 250;
  const cambio = montoRecibido - total;

  // Datos ejemplo de facturas
  const [facturas, setFacturas] = useState([
    { id: 1, fecha: "2025-03-10", total: 250 },
    { id: 2, fecha: "2025-03-09", total: 150 },
    { id: 3, fecha: "2025-03-08", total: 300 },
  ]);

  // Función para generar una nueva factura
  const generarFactura = () => {
    const nuevaFactura = {
      id: facturas.length + 1, // Generar un ID único
      fecha: new Date().toLocaleDateString(), // Fecha actual
      total: total, // El total de la cuenta
    };
    setFacturas([...facturas, nuevaFactura]); // Agregar la nueva factura al estado
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-2xl shadow-2xl text-white w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-6 drop-shadow-lg">
          💰 Caja
        </h1>

        {/* Resumen de la cuenta */}
        <div className="bg-gray-700 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Resumen de Cuenta</h2>
          <div className="space-y-2 text-lg">
            <div className="flex justify-between border-b border-gray-600 pb-2">
              <span>🍔 Hamburguesa x2</span>
              <span>$200</span>
            </div>
            <div className="flex justify-between border-b border-gray-600 pb-2">
              <span>🥤 Refresco x1</span>
              <span>$50</span>
            </div>
          </div>
          <div className="flex justify-between text-2xl font-bold mt-4">
            <span>Total:</span>
            <span className="text-green-400">${total}</span>
          </div>
        </div>

        {/* Sección de facturas */}
        <div className="bg-gray-700 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Generar Factura</h2>
          <Button
            className="w-full mt-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg border-4 border-blue-800 transition-all transform hover:scale-105"
            onClick={generarFactura}
          >
            Generar Factura
          </Button>
        </div>

        {/* Facturas generadas */}
        <div className="bg-gray-700 p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Facturas Generadas</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Factura #</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura) => (
                <tr key={factura.id} className="border-b border-gray-600">
                  <td className="px-4 py-2">{factura.id}</td>
                  <td className="px-4 py-2">{factura.fecha}</td>
                  <td className="px-4 py-2">${factura.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sección de pago */}
        <div className="mt-6 bg-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Pago</h2>
          <label className="block text-lg">Método de Pago</label>
          <select className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg mt-2">
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>Transferencia</option>
          </select>

          <label className="block text-lg mt-4">Monto Recibido</label>
          <input
            type="number"
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg mt-2"
            placeholder="Ingrese el monto"
            onChange={(e) => setMontoRecibido(parseFloat(e.target.value))}
          />

          <div className="mt-4 text-xl font-bold">
            Cambio:{" "}
            <span className={cambio >= 0 ? "text-green-400" : "text-red-500"}>
              ${cambio}
            </span>
          </div>

          <Button className="w-full mt-6 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg border-4 border-green-800 transition-all transform hover:scale-105">
            Cobrar
          </Button>
        </div>
      </div>
    </div>
  );
}
