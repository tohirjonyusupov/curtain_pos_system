"use client";
import { useMemo, useState } from "react";
import { InventoryProduct, AdjustType } from "@/lib/types";
import { fmt } from "@/lib/format";
import { AdjustModal } from "@/components/inventory/AdjustModal";
import {
  Button, Input, Tag,
  Table, Tr, Td, Toast,
} from "@/components/ui";
import { inventoryApi } from "@/lib/api";

interface Props {
  products: InventoryProduct[];
}

export default function InventoryClient({ products: initial }: Props) {
  const [products, setProducts] = useState<InventoryProduct[]>(initial || []);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<InventoryProduct | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return products;
    return products.filter((p) =>
      p.product.name.toLowerCase().includes(search.toLowerCase()) ||
      p.product.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const stateColor = (active: boolean) =>
    active === true ? "green" : "red";

  const stateLabel = (active: boolean) =>
    active === true ? "Mavjud" : "Tugagan";

  const handleAdjust = async (type: AdjustType, qty: number) => {
    if (!selected) return;
    try {
      const deltaQty = type === "in" ? qty : -qty;
      await inventoryApi.adjust(1, selected.id, deltaQty);
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== selected.id) return p;
          const newQty = type === "in" ? Number(p.qty) + qty : Math.max(0, p.qty - qty);
          return { ...p, qty: newQty };
        })
      );
      const label = type === "in" ? "Kirim" : "Chiqim";
      setToast(`${label}: ${selected.product.name} — ${qty} dona`);
      setTimeout(() => setToast(null), 2500);
      setSelected(null);
    } catch (err) {
      setToast("Xatolik: saqlanmadi");
      setTimeout(() => setToast(null), 2500);
    }
  };

  return (
    <>
      <Input
        value={search}
        onChange={setSearch}
        placeholder="Qidirish..."
        icon={<span style={{ fontSize: 14 }}>🔍</span>}
      />

      <Table
        headers={["#", "Mahsulot", "Kategoriya", "Narx", "Qoldiq", "Holat", ""]}
        empty={filtered.length === 0}
      >
        {filtered.map((p, i) => (
          <Tr key={p.id}>
            <Td mono muted>{String(i + 1).padStart(2, "0")}</Td>
            <Td><span style={{ fontWeight: 600 }}>{p.product.name.charAt(0).toUpperCase() + p.product.name.slice(1)}</span></Td>
            <Td><Tag color="blue">{p.product.category}</Tag></Td>
            <Td mono><span style={{ color: "var(--accent)" }}>{fmt(p.product.basePrice)}</span></Td>
            <Td mono>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{p.qty}</span>
            </Td>
            <Td>
              <Tag color={stateColor(p.product.isActive)}>{stateLabel(p.product.isActive)}</Tag>
            </Td>
            <Td>
              <Button
                variant="ghost"
                onClick={() => setSelected(p)}
                style={{ fontSize: 12, padding: "5px 12px" }}
              >
                Kirim / Chiqim
              </Button>
            </Td>
          </Tr>
        ))}
      </Table>

      {selected && (
        <AdjustModal
          product={selected}
          onAdjust={handleAdjust}
          onClose={() => setSelected(null)}
        />
      )}

      {toast && <Toast message={toast} />}
    </>
  );
}
