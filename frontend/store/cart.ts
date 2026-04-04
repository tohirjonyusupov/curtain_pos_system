import { create } from "zustand";
import { CartItem } from "@/lib/types";

interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.productId === item.productId ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, qty: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.productId !== productId),
    })),

  updateQty: (productId, qty) => {
    if (qty < 1) return;
    set((state) => ({
      cart: state.cart.map((i) =>
        i.productId === productId ? { ...i, qty } : i
      ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  total: () =>
    get().cart.reduce((sum, i) => sum + i.price * i.qty, 0),
}));
