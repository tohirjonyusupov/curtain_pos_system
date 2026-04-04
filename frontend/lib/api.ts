import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

// Products
export const productsApi = {
  getAll: (search?: string) =>
    api.get("/products", { params: search ? { search } : {} }),
  create: (data: unknown) => api.post("/products", data),
  update: (id: number, data: unknown) => api.put(`/products/${id}`, data),
  delete: (id: number) => api.delete(`/products/${id}`),
};

// Sales
export const salesApi = {
  create: (items: unknown[]) => api.post("/sales", { items }),
  getToday: () => api.get("/sales/today"),
};

// Inventory
export const inventoryApi = {
  adjust: (productId: number, type: "in" | "out", qty: number, note?: string) =>
    api.post("/inventory/adjust", { productId, type, qty, note }),
};
