import { inventoryApi } from "@/lib/api";
import { PageHeader } from "@/components/ui";
import InventoryClient from "@/components/inventory/InventoryClient";

export default async function InventoryPage() {
  const response = await inventoryApi.getAll(1);
  const products = response.data.data;

  return (
    <>
      <PageHeader title="Ombor" subtitle="Qoldiqlarni boshqarish" />

      <div style={{
        padding: "20px 28px", flex: 1, overflowY: "auto",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        <InventoryClient products={products} />
      </div>
    </>
  );
}
