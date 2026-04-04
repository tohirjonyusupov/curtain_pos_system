"use client";
import { Product } from "@/lib/types";
import { fmt } from "@/lib/format";

interface Props {
  products: Product[];
  cartQty: (id: number) => number | undefined;
  onAdd: (product: Product) => void;
}

export function ProductGrid({ products, cartQty, onAdd }: Props) {
  if (products.length === 0) {
    return (
      <div style={{ gridColumn: "1/-1", padding: 40, textAlign: "center", color: "var(--text3)", fontSize: 13 }}>
        Mahsulot topilmadi
      </div>
    );
  }

  return (
    <>
      {products.map((p) => {
        const qty = cartQty(p.id);
        const inCart = !!qty;
        return (
          <div
            key={p.id}
            onClick={() => onAdd(p)}
            style={{
              background: inCart ? "var(--surface2)" : "var(--surface)",
              border: `1px solid ${inCart ? "var(--accent)" : "var(--border)"}`,
              borderRadius: "var(--radius)", padding: 14,
              cursor: "pointer", transition: "all 0.15s", position: "relative",
            }}
            onMouseEnter={(e) => { if (!inCart) e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { if (!inCart) e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            {inCart && (
              <div style={{
                position: "absolute", top: 8, right: 8,
                width: 20, height: 20, borderRadius: "50%",
                background: "var(--accent)", color: "#0d0f14",
                fontSize: 10, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--mono)",
              }}>
                {qty}
              </div>
            )}
            <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "var(--mono)", marginBottom: 6 }}>
              {p.category}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>
              {p.name}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", fontFamily: "var(--mono)" }}>
              {fmt(p.price)}
            </div>
            <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 4 }}>
              Qoldiq: {p.stock} dona
            </div>
          </div>
        );
      })}
    </>
  );
}
