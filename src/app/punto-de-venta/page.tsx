"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PuntoDeVenta() {
  const [mesa, setMesa] = useState("Mesa 1");
  const [mesero, setMesero] = useState("Juan Pérez");
  const [estadoComanda, setEstadoComanda] = useState("Pendiente");
  const [idComanda, setIdComanda] = useState(
    Math.floor(Math.random() * 1000) + 1
  );
  const [pedido, setPedido] = useState<
    { nombre: string; precio: number; cantidad: number }[]
  >([]);
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [propina, setPropina] = useState(0);
  const [tipoServicio, setTipoServicio] = useState("Comer en Restaurante"); // Nuevo estado para tipo de servicio

  const mesas = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];
  const meseros = ["Juan Pérez", "María López", "Carlos Gómez", "Ana Ramírez"];
  const metodosPago = ["Efectivo", "Tarjeta", "Transferencia"];

  const productos = {
    bebidas: [
      { nombre: "🥤 Refresco", precio: 30 },
      { nombre: "🍺 Cerveza", precio: 60 },
    ],
    entradas: [
      { nombre: "🍟 Papas Fritas", precio: 50 },
      { nombre: "🧀 Nachos", precio: 90 },
    ],
    platosFuertes: [
      { nombre: "🍗 Alitas BBQ", precio: 120 },
      { nombre: "🍔 Hamburguesa", precio: 150 },
    ],
    postres: [
      { nombre: "🍰 Cheesecake", precio: 90 },
      { nombre: "🍩 Dona", precio: 40 },
    ],
  };

  const agregarProducto = (producto: { nombre: string; precio: number }) => {
    setPedido((prev) => {
      const existe = prev.find((p) => p.nombre === producto.nombre);
      return existe
        ? prev.map((p) =>
            p.nombre === producto.nombre
              ? { ...p, cantidad: p.cantidad + 1 }
              : p
          )
        : [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (nombre: string) => {
    setPedido((prev) => prev.filter((p) => p.nombre !== nombre));
  };

  const enviarOrden = () => {
    setEstadoComanda("Preparando");
  };

  const total =
    pedido.reduce((acc, item) => acc + item.precio * item.cantidad, 0) +
    propina;

  const imprimirCuenta = () => {
    alert(
      `Cuenta de la Mesa ${mesa}:\n\n${pedido
        .map(
          (item) =>
            `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`
        )
        .join("\n")}\n\nTotal: $${total}`
    );
  };

  const cobrarComanda = () => {
    alert(
      `Comanda Cobrada!\n\nMétodo de Pago: ${metodoPago}\nTotal: $${total}`
    );
    setEstadoComanda("Entregado");
    setPedido([]);
    setPropina(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl text-white w-full max-w-5xl">
        {/* Información de la Mesa y Comanda */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="text-lg font-semibold mr-2">🛑 Mesa:</label>
            <select
              className="bg-gray-700 text-white px-3 py-1 rounded-md"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
            >
              {mesas.map((m, index) => (
                <option key={index} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-lg font-semibold mr-2">👨‍🍳 Mesero:</label>
            <select
              className="bg-gray-700 text-white px-3 py-1 rounded-md"
              value={mesero}
              onChange={(e) => setMesero(e.target.value)}
            >
              {meseros.map((m, index) => (
                <option key={index} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Estado de la Comanda */}
        <div className="mb-6">
          <p className="text-lg font-semibold">
            📋 Número de Orden:{" "}
            <span className="text-green-400">#{idComanda}</span>
          </p>
          <p className="text-lg font-semibold">
            📦 Estado: <span className="text-yellow-400">{estadoComanda}</span>
          </p>
        </div>

        {/* Tipo de Servicio */}
        <div className="mb-6">
          <label className="text-lg font-semibold mr-2">
            🍴 Tipo de Servicio:
          </label>
          <select
            className="bg-gray-700 text-white px-3 py-1 rounded-md"
            value={tipoServicio}
            onChange={(e) => setTipoServicio(e.target.value)}
          >
            <option value="Comer en Restaurante">Comer en Restaurante</option>
            <option value="Para Llevar">Para Llevar</option>
            <option value="A Domicilio">A Domicilio</option>
          </select>
        </div>

        {/* Sección de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-6 rounded-xl shadow-lg col-span-2">
            <h2 className="text-2xl font-semibold mb-4">🍽️ Menú</h2>
            {Object.entries(productos).map(([categoria, items]) => (
              <div key={categoria} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-300 mb-3 capitalize">
                  {categoria}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((producto, index) => (
                    <Button
                      key={index}
                      className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg border-4 border-blue-800 transition-all transform hover:scale-105"
                      onClick={() => agregarProducto(producto)}
                    >
                      {producto.nombre} - ${producto.precio}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Carrito */}
          <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">📝 Pedido</h2>
            {pedido.length === 0 ? (
              <p className="text-gray-400">No hay productos en el pedido.</p>
            ) : (
              <div className="space-y-3">
                {pedido.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
                  >
                    <span>
                      {item.nombre} x{item.cantidad}
                    </span>
                    <span className="font-bold">
                      ${item.precio * item.cantidad}
                    </span>
                    <Button
                      className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-1 text-white rounded-lg"
                      onClick={() => eliminarProducto(item.nombre)}
                    >
                      ✖
                    </Button>
                  </div>
                ))}
                <hr className="my-3 border-gray-600" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-400">${total}</span>
                </div>
                {/* Propina */}
                <div className="mt-3">
                  <label className="text-lg font-semibold">💰 Propina:</label>
                  <input
                    type="number"
                    value={propina}
                    onChange={(e) => setPropina(Number(e.target.value))}
                    className="bg-gray-700 text-white px-3 py-1 rounded-md"
                    min={0}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="mt-6">
          <label className="text-lg font-semibold mr-2">
            💳 Método de Pago:
          </label>
          <select
            className="bg-gray-700 text-white px-3 py-1 rounded-md"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            {metodosPago.map((metodo, index) => (
              <option key={index} value={metodo}>
                {metodo}
              </option>
            ))}
          </select>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg shadow-lg"
            onClick={enviarOrden}
          >
            🚀 Enviar Orden
          </Button>
          <Button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg"
            onClick={imprimirCuenta}
          >
            🖨️ Imprimir Cuenta
          </Button>
          <Button
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg"
            onClick={cobrarComanda}
          >
            💸 Cobrar
          </Button>
        </div>
      </div>
    </div>
  );
}
