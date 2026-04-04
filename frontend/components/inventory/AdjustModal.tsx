"use client";
import { useState } from "react";
import { Product, AdjustType } from "@/lib/types";
import { Modal, Button, FormField, Input } from "@/components/ui";

interface Props {
  product: Product;
  onAdjust: (type: AdjustType, qty: number, note: string) => void;
  onClose: () => void;
}

export function AdjustModal({ product, onAdjust, onClose }: Props) {
  const [type, setType] = useState<AdjustType>("in");
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");

  const parsedQty = parseInt(qty) || 0;
  const newStock =
    type === "in"
      ? product.stock + parsedQty
      : Math.max(0, product.stock - parsedQty);

  const handleConfirm = () => {
    if (parsedQty < 1) return;
    onAdjust(type, parsedQty, note);
  };

  return (
    <Modal
      title={product.name}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Bekor</Button>
          <Button variant="accent" onClick={handleConfirm}>Tasdiqlash</Button>
        </>
      }
    >
      {/* Current stock info */}
      <div style={{
        background: "var(--surface2)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)", padding: "10px 14px",
        fontSize: 12, fontFamily: "var(--mono)", color: "var(--text2)",
      }}>
        Hozirgi qoldiq:{" "}
        <strong style={{ color: "var(--text)", fontSize: 14 }}>
          {product.stock} dona
        </strong>
      </div>

      {/* Type tabs */}
      <FormField label="Harakat turi">
        <div style={{
          display: "flex", border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)", overflow: "hidden",
        }}>
          {(["in", "out"] as AdjustType[]).map((t) => {
            const active = type === t;
            return (
              <div
                key={t}
                onClick={() => setType(t)}
                style={{
                  flex: 1, padding: "9px 0", textAlign: "center",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.15s",
                  background: active
                    ? t === "in"
                      ? "rgba(34,197,94,0.2)"
                      : "rgba(239,68,68,0.2)"
                    : "transparent",
                  color: active
                    ? t === "in" ? "var(--green)" : "var(--red)"
                    : "var(--text3)",
                }}
              >
                {t === "in" ? "↑ Kirim" : "↓ Chiqim"}
              </div>
            );
          })}
        </div>
      </FormField>

      <FormField label="Miqdor (dona)">
        <Input
          value={qty}
          onChange={setQty}
          placeholder="0"
          type="number"
          autoFocus
        />
      </FormField>

      <FormField label="Izoh (ixtiyoriy)">
        <Input value={note} onChange={setNote} placeholder="Sabab..." />
      </FormField>

      {/* Preview */}
      {parsedQty > 0 && (
        <div style={{
          background: "var(--surface2)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)", padding: "10px 14px",
          fontSize: 12, fontFamily: "var(--mono)",
        }}>
          Yangi qoldiq:{" "}
          <strong style={{ color: type === "in" ? "var(--green)" : "var(--red)", fontSize: 15 }}>
            {newStock} dona
          </strong>
        </div>
      )}
    </Modal>
  );
}
