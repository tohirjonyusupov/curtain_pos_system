import { Product, Sale } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Coca-Cola 0.5L", price: 8500, stock: 120, category: "Ichimlik" },
  { id: 2, name: "Pepsi 0.5L", price: 7500, stock: 85, category: "Ichimlik" },
  { id: 3, name: "Suv Artic 1.5L", price: 4000, stock: 200, category: "Ichimlik" },
  { id: 4, name: "Lipton Choy", price: 12000, stock: 60, category: "Choy" },
  { id: 5, name: "Nescafe 3в1", price: 3500, stock: 150, category: "Qahva" },
  { id: 6, name: "Snickers", price: 9000, stock: 45, category: "Shirinlik" },
  { id: 7, name: "Lay's Classic", price: 11000, stock: 30, category: "Snack" },
  { id: 8, name: "Oreo Original", price: 14000, stock: 55, category: "Shirinlik" },
  { id: 9, name: "Red Bull 250ml", price: 22000, stock: 40, category: "Ichimlik" },
  { id: 10, name: "Mineral Suv", price: 3000, stock: 300, category: "Ichimlik" },
  { id: 11, name: "Bounty", price: 8500, stock: 70, category: "Shirinlik" },
  { id: 12, name: "Pringles Original", price: 18000, stock: 25, category: "Snack" },
];

export const MOCK_TODAY_SALES: Sale[] = [
  { id: 1, time: "09:14", items: 3, total: 28500 },
  { id: 2, time: "10:32", items: 1, total: 22000 },
  { id: 3, time: "11:05", items: 5, total: 61000 },
  { id: 4, time: "12:48", items: 2, total: 17000 },
];
