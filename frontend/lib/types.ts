export interface Product {
  id: number,
  storeId: number,
  productId: number,
  qty: number,
  updatedAt: string,
  product: {
    name: string,
    sku: string,
    category: string,
    unit: string,
    basePrice: number,
    isActive: boolean
  }
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
