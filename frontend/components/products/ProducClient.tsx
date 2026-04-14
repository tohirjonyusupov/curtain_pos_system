"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { fmt } from "@/lib/format";
import { PageHeader, Button, Input, Tag, Table, Tr, Td, Toast } from "@/components/ui";
import { Product } from "@/lib/types";
import { productsApi } from "@/lib/api";

interface Props {
  initialProducts: Product[];
}

export default function ProductsClient({ initialProducts }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();
    if (!keyword) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
  }, [products, search]);

  const handleDelete = async (id: number) => {
    // try {
    //   setBusy(true);
    //   await productsApi.delete(id);
    //   setProducts((prev) => prev.filter((product) => product.id !== id));
    //   showToast("Mahsulot o'chirildi");
    // } catch {
    //   showToast("Mahsulot o'chirilmadi");
    // } finally {
    //   setBusy(false);
    // }
    console.log(id);
    
  };

  return (
    <>
      <PageHeader
        title="Mahsulotlar"
        subtitle={`${products.length} ta mahsulot`}
        action={
          <Button variant="accent" onClick={() => router.push("/dashboard/products/new")} disabled={busy}>
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
          icon={<span style={{ fontSize: 12 }}>Q</span>}
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
                    onClick={() => router.push(`/dashboard/products/${product.id}/edit`)}
                    disabled={busy}
                    style={{ padding: "5px 10px", fontSize: 12 }}
                  >
                    Tahrir
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                    disabled={busy}
                    style={{ padding: "5px 8px", fontSize: 13 }}
                  >
                    X
                  </Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      </div>

      {toast && <Toast message={toast} />}
    </>
  );
}
