"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productsApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { Button, FormField, Input, PageHeader, Toast } from "@/components/ui";

interface Props {
  mode: "create" | "edit";
  storeId: number;
  product?: Product;
}

type ProductFormData = Omit<Product, "id" | "storeId" | "sku" | "unit" | "isActive" | "createdAt">;

export default function ProductFormPage({ mode, storeId, product }: Props) {
  const router = useRouter();
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(String(product?.basePrice ?? ""));
  const [category, setCategory] = useState(product?.category ?? "");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSubmit = async () => {
    if (!name || !price) {
      showToast("Nom va narx majburiy");
      return;
    }

    const payload: ProductFormData = {
      name,
      category,
      basePrice: Number(price),
    };

    try {
      setBusy(true);

      if (mode === "create") {
        await productsApi.create({ ...payload, storeId });
        showToast("Mahsulot qo'shildi");
      } else if (product) {
        await productsApi.update(product.id, { ...payload, storeId });
        showToast("Mahsulot yangilandi");
      }

      router.push("/dashboard/products");
      router.refresh();
    } catch {
      showToast("Xatolik: saqlanmadi");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title={mode === "create" ? "Yangi mahsulot" : "Mahsulotni tahrirlash"}
        subtitle={mode === "create" ? "Yangi mahsulot qo'shish" : product?.name}
        action={
          <Button variant="ghost" onClick={() => router.push("/dashboard/products")}>Ortga</Button>
        }
      />

      <div style={{
        padding: "20px 28px",
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}>
        <div style={{
          width: "100%",
          maxWidth: 520,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}>
          <FormField label="Mahsulot nomi">
            <Input value={name} onChange={setName} placeholder="Nomi..." autoFocus />
          </FormField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Narx (so'm)">
              <Input value={price} onChange={setPrice} placeholder="0" type="number" />
            </FormField>
            <FormField label="Kategoriya">
              <Input value={category} onChange={setCategory} placeholder="Kategoriya..." />
            </FormField>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8 }}>
            <Button variant="ghost" onClick={() => router.push("/dashboard/products")} disabled={busy}>Bekor</Button>
            <Button variant="accent" onClick={handleSubmit} disabled={busy}>
              {busy ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </>
  );
}
