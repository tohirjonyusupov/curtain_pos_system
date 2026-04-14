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

type ProductFormData = Omit<Product, "id" | "createdAt">;

export default function ProductFormPage({ mode, storeId, product }: Props) {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    storeId: storeId,
    sku: product?.sku ?? `SKU-${Date.now()}`,
    name: product?.name ?? "",
    category: product?.category ?? "",
    unit: product?.unit ?? "",
    basePrice: product?.basePrice ?? 0,
    isActive: product?.isActive ?? true,
  });
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{message: string, type: "success" | "error"} | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({message, type});
    setTimeout(() => setToast(null), 2500);
  };

  const handleSubmit = async () => {
    if (!newProduct.name.trim() || newProduct.basePrice < 0) {
      showToast("Nom va narx majburiy", "error");
      return;
    }

    if(newProduct.unit != "meter" && newProduct.unit != "piece") {
      showToast("Unit faqat meter yoki piece bo'lishi mumkin", "error");
      return;
    }

    try {
      setBusy(true);

      if (mode === "create") {
        await productsApi.create({ ...newProduct, storeId });
        console.log(newProduct);
        showToast("Mahsulot qo'shildi");
      } else if (product) {
        
        await productsApi.update(product.id, { ...newProduct });
        showToast("Mahsulot yangilandi");        
      }

      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      showToast("Xatolik: saqlanmadi", "error");
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
          width: "80%",
          margin: "0 auto",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}>
          <FormField label="Mahsulot nomi">
            <Input value={newProduct.name} onChange={(val) => setNewProduct({...newProduct, name: val})} placeholder="Nomi..." autoFocus />
          </FormField>
          <FormField label="SKU">
            <Input value={newProduct.sku} onChange={(val) => setNewProduct({...newProduct, sku: val})} placeholder="SKU..." />
          </FormField>
          <FormField label="Unit">
            <Input value={newProduct.unit} onChange={(val) => setNewProduct({...newProduct, unit: val})} placeholder="Unit..." />
          </FormField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Narx (so'm)">
              <Input value={String(newProduct.basePrice)} onChange={(val) => setNewProduct({...newProduct, basePrice: Number(val)})} placeholder="0" type="number" />
            </FormField>
            <FormField label="Kategoriya">
              <Input value={newProduct.category} onChange={(val) => setNewProduct({...newProduct, category: val})} placeholder="Kategoriya..." />
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

      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}
