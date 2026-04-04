export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface CartItem {
  productId: number;
  name: string;
  qty: number;
  price: number;
}

export interface Sale {
  id: number;
  time: string;
  items: number;
  total: number;
}

export type AdjustType = "in" | "out";
