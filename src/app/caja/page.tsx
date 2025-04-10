"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Caja() {
  const [montoRecibido, setMontoRecibido] = useState(0);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const total = 250;
  const cambio = montoRecibido - total;

  // Datos ejemplo de facturas
  const [facturas, setFacturas] = useState([
    { id: 1, fecha: "2025-03-10", total: 250, mesa: "5", cliente: "Juan Pérez" },
    { id: 2, fecha: "2025-03-09", total: 150, mesa: "3", cliente: "María García" },
    { id: 3, fecha: "2025-03-08", total: 300, mesa: "VIP 2", cliente: "Carlos Rodríguez" },
  ]);

  // Generar nueva factura
  const generarFactura = () => {
    const nuevaFactura = {
      id: Math.max(...facturas.map(f => f.id)) + 1,
      fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      total: total,
      mesa: "4", // Ejemplo
      cliente: "Cliente Nuevo" // Ejemplo
    };
    setFacturas([nuevaFactura, ...facturas]);
  };

  // Opciones de menú
  const itemsMenu = [
    { nombre: "Hamburguesa Gourmet x2", precio: 200, categoria: "Plato Principal" },
    { nombre: "Refresco Artesanal x1", precio: 50, categoria: "Bebida" },
    { nombre: "Postre del Chef", precio: 80, categoria: "Postre" }
  ];

  return (
    <div className="min-h-screen bg-gray-800 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-light text-white tracking-wider">
              <span className="font-medium">RESTAURANTE</span> NAMI ACAPULCO
            </h1>
            <p className="text-gray-400">Sistema de Gestión de Caja</p>
          </div>
          <div className="text-right">
            <p className="text-white">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-gray-400">Usuario: Administrador</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna 1 - Pedido actual */}
          <div className="bg-gray-700 rounded-xl shadow-lg p-6 col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                PEDIDO ACTUAL
              </h2>
              <div className="bg-gray-600 px-4 py-2 rounded-lg">
                <span className="text-gray-300 mr-2">Mesa:</span>
                <span className="font-medium text-white">4</span>
              </div>
            </div>

            {/* Detalles del pedido */}
            <div className="mb-8">
              <div className="grid grid-cols-5 gap-4 text-gray-400 font-medium text-sm uppercase tracking-wider mb-2 px-2">
                <div className="col-span-2">Ítem</div>
                <div className="text-center">Categoría</div>
                <div className="text-center">Precio Unit.</div>
                <div className="text-right">Subtotal</div>
              </div>

              <div className="space-y-3">
                {itemsMenu.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 bg-gray-600 p-3 rounded-lg items-center">
                    <div className="col-span-2 font-medium text-white">{item.nombre}</div>
                    <div className="text-center text-gray-300">{item.categoria}</div>
                    <div className="text-center text-gray-300">${item.precio.toFixed(2)}</div>
                    <div className="text-right font-medium text-white">${item.precio.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totales */}
            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between text-lg mb-2">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg mb-2">
                <span className="text-gray-300">Impuestos (10%):</span>
                <span className="text-white">${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4 pt-2 border-t border-gray-600">
                <span className="text-white">Total a Pagar:</span>
                <span className="text-green-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Columna 2 - Proceso de pago */}
          <div className="space-y-6">
            {/* Método de pago */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                MÉTODO DE PAGO
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setMetodoPago("efectivo")}
                    className={`p-3 rounded-lg border ${metodoPago === "efectivo" ? "bg-blue-600 border-blue-400" : "bg-gray-800 border-gray-600"} transition-colors`}
                  >
                    Efectivo
                  </button>
                  <button
                    onClick={() => setMetodoPago("tarjeta")}
                    className={`p-3 rounded-lg border ${metodoPago === "tarjeta" ? "bg-blue-600 border-blue-400" : "bg-gray-800 border-gray-600"} transition-colors`}
                  >
                    Tarjeta
                  </button>
                  <button
                    onClick={() => setMetodoPago("transferencia")}
                    className={`p-3 rounded-lg border ${metodoPago === "transferencia" ? "bg-blue-600 border-blue-400" : "bg-gray-800 border-gray-600"} transition-colors`}
                  >
                    Transferencia
                  </button>
                </div>

                {metodoPago === "efectivo" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Monto Recibido</label>
                      <input
                        type="number"
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                        onChange={(e) => setMontoRecibido(parseFloat(e.target.value))}
                      />
                    </div>

                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cambio:</span>
                        <span className={`text-lg font-medium ${cambio >= 0 ? "text-green-400" : "text-red-400"}`}>
                          ${Math.abs(cambio).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {metodoPago === "tarjeta" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Número de Tarjeta</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="**** **** **** ****"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Vencimiento</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">CVV</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="***"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="space-y-3">
              <Button
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg border border-green-500 transition-all text-lg font-medium"
                disabled={metodoPago === "efectivo" && cambio < 0}
              >
                PROCESAR PAGO
              </Button>

              <Button
                onClick={generarFactura}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg border border-blue-500 transition-all text-lg font-medium"
              >
                GENERAR FACTURA
              </Button>

              <Button
                className="w-full py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg border border-gray-500 transition-all text-lg font-medium"
              >
                IMPRIMIR TICKET
              </Button>
            </div>

            {/* Historial reciente */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                FACTURAS RECIENTES
              </h2>

              <div className="space-y-3">
                {facturas.slice(0, 3).map((factura) => (
                  <div key={factura.id} className="bg-gray-600 p-3 rounded-lg hover:bg-gray-500 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-white">#{factura.id}</p>
                        <p className="text-sm text-gray-300">{factura.fecha}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-medium">${factura.total.toFixed(2)}</p>
                        <p className="text-xs text-gray-400">{factura.mesa} • {factura.cliente}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full mt-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg border border-gray-700 transition-all text-sm"
              >
                VER HISTORIAL COMPLETO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}