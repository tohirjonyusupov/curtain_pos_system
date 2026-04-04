"use client";
import { CartItem } from "@/lib/types";
import { fmt } from "@/lib/format";
import { Button } from "@/components/ui";

interface Props {
  cart: CartItem[];
  total: number;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
  onClear: () => void;
  onSell: () => void;
}

export function Cart({ cart, total, onRemove, onUpdateQty, onClear, onSell }: Props) {
  return (
    <div style={{
      width: 340, flexShrink: 0,
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 18px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Savat</div>
          <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>
            {cart.length} xil mahsulot
          </div>
        </div>
        {cart.length > 0 && (
          <Button variant="ghost" onClick={onClear} style={{ fontSize: 11, padding: "5px 10px" }}>
            Tozalash
          </Button>
        )}
      </div>

      {/* Items */}
      {cart.length === 0 ? (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 8, color: "var(--text3)",
        }}>
          <div style={{ fontSize: 36, opacity: 0.3 }}>🛒</div>
          <p style={{ fontSize: 12 }}>Mahsulot tanlang</p>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {cart.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onRemove={() => onRemove(item.productId)}
              onUpdateQty={(q) => onUpdateQty(item.productId, q)}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: "14px 18px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text2)" }}>Jami to'lov:</span>
          <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--mono)", color: "var(--accent)" }}>
            {fmt(total)}
          </span>
        </div>
        <Button variant="green" disabled={cart.length === 0} onClick={onSell} fullWidth style={{ padding: 14, fontSize: 15, borderRadius: "var(--radius)" }}>
          ✓ Sotish
        </Button>
      </div>
    </div>
  );
}

function CartItemRow({ item, onRemove, onUpdateQty }: {
  item: CartItem; onRemove: () => void; onUpdateQty: (q: number) => void;
}) {
  return (
    <div style={{
      background: "var(--surface2)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)", padding: "10px 12px",
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, flex: 1, marginRight: 8 }}>
          {item.name}
        </div>
        <button onClick={onRemove} style={{
          background: "transparent", border: "none", color: "var(--red)",
          cursor: "pointer", padding: 2, borderRadius: 4, display: "flex",
          fontSize: 13,
        }}>✕</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--accent)" }}>
          {fmt(item.price * item.qty)}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <QtyBtn onClick={() => onUpdateQty(item.qty - 1)}>−</QtyBtn>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--mono)", minWidth: 20, textAlign: "center" }}>
            {item.qty}
          </span>
          <QtyBtn onClick={() => onUpdateQty(item.qty + 1)}>+</QtyBtn>
        </div>
      </div>
    </div>
  );
}

function QtyBtn({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: 24, height: 24, borderRadius: 4,
      background: "var(--surface3)", border: "1px solid var(--border2)",
      color: "var(--text)", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 14, fontWeight: 600,
    }}>
      {children}
    </button>
  );
}
