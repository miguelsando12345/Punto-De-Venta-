import { create } from "zustand";
import { persist } from "zustand/middleware";

// Ajusta el tipo Producto según tu schema real (descripción, precio, etc.)
export interface Producto {
  id_producto: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria_id: number;
  disponible: boolean;
}

// Representa un ítem del carrito (producto + cantidad)
export interface CartItem {
  producto: Producto;
  quantity: number;
}

/**
 * Estructura del estado global:
 * - carts: diccionario donde la clave es "mesaId" y el valor es un array de CartItem
 */
interface CartsState {
  carts: { [mesaId: string]: CartItem[] };
  addProduct: (mesaId: string, producto: Producto) => void;
  removeProduct: (mesaId: string, id_producto: number) => void;
  incrementQuantity: (mesaId: string, id_producto: number) => void;
  decrementQuantity: (mesaId: string, id_producto: number) => void;
  clearCart: (mesaId: string) => void;
  clearAllCarts: () => void; // Opcional, por si deseas limpiar todo
}

export const useCartStore = create(
  persist<CartsState>(
    (set, get) => ({
      carts: {},

      // Añadir producto a la mesa indicada
      addProduct: (mesaId, producto) => {
        const { carts } = get();
        const currentCart = carts[mesaId] || [];

        // Revisar si ya existe
        const itemIndex = currentCart.findIndex(
          (item) => item.producto.id_producto === producto.id_producto
        );

        let newCart: CartItem[];

        if (itemIndex >= 0) {
          // Incrementamos la cantidad
          newCart = [...currentCart];
          newCart[itemIndex].quantity++;
        } else {
          // Agregamos un nuevo item con quantity=1
          newCart = [...currentCart, { producto, quantity: 1 }];
        }

        set({
          carts: {
            ...carts,
            [mesaId]: newCart,
          },
        });
      },

      // Eliminar el producto de la mesa
      removeProduct: (mesaId, id_producto) => {
        const { carts } = get();
        const currentCart = carts[mesaId] || [];
        const newCart = currentCart.filter(
          (item) => item.producto.id_producto !== id_producto
        );

        set({
          carts: {
            ...carts,
            [mesaId]: newCart,
          },
        });
      },

      // Incrementar cantidad
      incrementQuantity: (mesaId, id_producto) => {
        const { carts } = get();
        const currentCart = carts[mesaId] || [];
        const newCart = currentCart.map((item) => {
          if (item.producto.id_producto === id_producto) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        set({
          carts: {
            ...carts,
            [mesaId]: newCart,
          },
        });
      },

      // Decrementar cantidad
      decrementQuantity: (mesaId, id_producto) => {
        const { carts } = get();
        const currentCart = carts[mesaId] || [];
        const newCart = currentCart
          .map((item) => {
            if (item.producto.id_producto === id_producto) {
              return {
                ...item,
                quantity: Math.max(1, item.quantity - 1),
              };
            }
            return item;
          })
          .filter((item) => item.quantity > 0); // Por si se desea eliminar cuando llega a 0

        set({
          carts: {
            ...carts,
            [mesaId]: newCart,
          },
        });
      },

      // Limpiar carrito de una mesa en particular
      clearCart: (mesaId) => {
        const { carts } = get();
        const newCarts = { ...carts };
        newCarts[mesaId] = [];
        set({ carts: newCarts });
      },

      // Limpiar TODOS los carritos (opcional)
      clearAllCarts: () => {
        set({ carts: {} });
      },
    }),
    {
      name: "punto-de-venta-carts", // Nombre de la clave en localStorage
    }
  )
);
