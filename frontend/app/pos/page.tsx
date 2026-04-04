"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductGrid } from "@/components/pos/ProductGrid";
import { Cart } from "@/components/pos/Cart";
import { Input, PageHeader, Toast } from "@/components/ui";

export default function POSPage() {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const { cart, addToCart, removeFromCart, updateQty, clearCart, total } = useCartStore();

  const filtered = MOCK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const cartQty = (id: number) => cart.find((i) => i.productId === id)?.qty;

  const handleSell = () => {
    if (cart.length === 0) return;
    // TODO: await salesApi.create(cart)
    setToast(`Sotuv amalga oshirildi — ${total().toLocaleString("uz-UZ")} so'm`);
    clearCart();
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <>
      <PageHeader title="POS Kassa" subtitle="Savdo punkti" />

      <div style={{
        display: "flex", height: "calc(100vh - 72px)",
        padding: "20px 28px", gap: 20, overflow: "hidden",
      }}>
        {/* LEFT: Products */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
          <Input
            value={search}
            onChange={setSearch}
            placeholder="Mahsulot qidirish..."
            icon={<span style={{ fontSize: 14 }}>🔍</span>}
          />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 10, overflowY: "auto", flex: 1, paddingRight: 4,
          }}>
            <ProductGrid
              products={filtered}
              cartQty={cartQty}
              onAdd={(p) => addToCart({ productId: p.id, name: p.name, price: p.price })}
            />
          </div>
        </div>

        {/* RIGHT: Cart */}
        <Cart
          cart={cart}
          total={total()}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onClear={clearCart}
          onSell={handleSell}
        />
      </div>

      {toast && <Toast message={toast} />}
    </>
  );
}
