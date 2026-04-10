"use client";

import { useMemo, useState } from "react";
import { fmt } from "@/lib/format";
import { ProductModal } from "@/components/products/ProductModal";
import { PageHeader, Button, Input, Tag, Table, Tr, Td } from "@/components/ui";
import { Product } from "@/lib/types";

interface Props {
  initialProducts: Product[];
}

export default function ProductsClient({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | Product | null>(null);

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();
    if (!keyword) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
  }, [products, search]);

  const handleSave = (data: Omit<Product, "id" | "storeId" | "sku" | "unit" | "isActive" | "createdAt">) => {
    if (modal === "add") {
      setProducts((prev) => [...prev, { id: Date.now(), storeId: 0, sku: "", unit: "", isActive: true, createdAt: new Date().toISOString(), ...data }]);
    } else if (modal && typeof modal === "object") {
      setProducts((prev) =>
        prev.map((product) => (product.id === modal.id ? { ...product, ...data } : product))
      );
    }
    setModal(null);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

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
          headers={["#", "Nomi", "Kategoriya", "Narx", ""]}
          empty={filtered.length === 0}
        >
          {filtered.map((product, index) => (
            <Tr key={product.id}>
              <Td mono muted>{String(index + 1).padStart(2, "0")}</Td>
              <Td><span style={{ fontWeight: 600 }}>{product.name}</span></Td>
              <Td><Tag color="blue">{product.category}</Tag></Td>
              <Td mono><span style={{ color: "var(--accent)" }}>{fmt(product.basePrice)}</span></Td>
              <Td>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <Button
                    variant="ghost"
                    onClick={() => setModal(product)}
                    style={{ padding: "5px 10px", fontSize: 12 }}
                  >
                    ✎ Tahrir
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
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

