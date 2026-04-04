"use client";
import { useState } from "react";
import { Product } from "@/lib/types";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { fmt } from "@/lib/format";
import { ProductModal } from "@/components/products/ProductModal";
import {
  PageHeader, Button, Input, Tag,
  Table, Tr, Td,
} from "@/components/ui";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | Product | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: Omit<Product, "id">) => {
    if (modal === "add") {
      setProducts((prev) => [...prev, { id: Date.now(), ...data }]);
    } else if (modal && typeof modal === "object") {
      setProducts((prev) =>
        prev.map((p) => (p.id === modal.id ? { ...p, ...data } : p))
      );
    }
    setModal(null);
  };

  const handleDelete = (id: number) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <>
      <PageHeader
        title="Mahsulotlar"
        subtitle={`${products.length} ta mahsulot`}
        action={
          <Button variant="accent" onClick={() => setModal("add")}>
            + Qo&apos;shish
          </Button>
        }
      />

      <div style={{
        padding: "20px 28px", flex: 1, overflowY: "auto",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        <Input
          value={search}
          onChange={setSearch}
          placeholder="Qidirish..."
          icon={<span style={{ fontSize: 14 }}>🔍</span>}
        />

        <Table
          headers={["#", "Nomi", "Kategoriya", "Narx", "Qoldiq", ""]}
          empty={filtered.length === 0}
        >
          {filtered.map((p, i) => (
            <Tr key={p.id}>
              <Td mono muted>{String(i + 1).padStart(2, "0")}</Td>
              <Td><span style={{ fontWeight: 600 }}>{p.name}</span></Td>
              <Td><Tag color="blue">{p.category}</Tag></Td>
              <Td mono><span style={{ color: "var(--accent)" }}>{fmt(p.price)}</span></Td>
              <Td>
                <Tag color={p.stock > 20 ? "green" : "red"}>{p.stock} dona</Tag>
              </Td>
              <Td>
                <div style={{ display: "flex", gap: 6 }}>
                  <Button
                    variant="ghost"
                    onClick={() => setModal(p)}
                    style={{ padding: "5px 10px", fontSize: 12 }}
                  >
                    ✎ Tahrir
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(p.id)}
                    style={{ padding: "5px 8px", fontSize: 13 }}
                  >
                    ✕
                  </Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      </div>

      {modal !== null && (
        <ProductModal
          product={typeof modal === "object" ? modal : undefined}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
