// components/OrderSummary.tsx
import { Producto } from "@/types";

interface OrderSummaryProps {
  comanda: Producto[];
}

const OrderSummary = ({ comanda }: OrderSummaryProps) => {
  const total = comanda.reduce((acc, item) => acc + item.precio, 0); // Calcular el total de la comanda

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-xl w-80 max-h-96 overflow-auto">
      <h3 className="text-xl font-semibold text-white mb-4">Comanda</h3>
      {comanda.length === 0 ? (
        <p className="text-gray-400">No hay productos en la comanda.</p>
      ) : (
        <ul className="space-y-2">
          {comanda.map((producto, index) => (
            <li key={index} className="text-white">
              {producto.nombre} - ${producto.precio.toFixed(2)}
            </li>
          ))}
          <hr className="my-3 border-gray-600" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-green-400">${total.toFixed(2)}</span>
          </div>
        </ul>
      )}
    </div>
  );
};

export default OrderSummary;
