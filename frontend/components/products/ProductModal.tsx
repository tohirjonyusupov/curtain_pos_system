"use client";
import { useState, useEffect } from "react";
import { Product } from "@/lib/types";
import { Modal, Button, FormField, Input } from "@/components/ui";

interface Props {
  product?: Product;
  onSave: (data: Omit<Product, "id">) => void;
  onClose: () => void;
}

export function ProductModal({ product, onSave, onClose }: Props) {
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [stock, setStock] = useState(String(product?.stock ?? ""));
  const [category, setCategory] = useState(product?.category ?? "");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setCategory(product.category);
    }
  }, [product]);

  const handleSave = () => {
    if (!name || !price) return;
    onSave({ name, price: +price, stock: +stock || 0, category });
  };

  return (
    <Modal
      title={product ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Bekor</Button>
          <Button variant="accent" onClick={handleSave}>Saqlash</Button>
        </>
      }
    >
      <FormField label="Mahsulot nomi">
        <Input value={name} onChange={setName} placeholder="Nomi..." autoFocus />
      </FormField>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormField label="Narx (so'm)">
          <Input value={price} onChange={setPrice} placeholder="0" type="number" />
        </FormField>
        <FormField label="Qoldiq (dona)">
          <Input value={stock} onChange={setStock} placeholder="0" type="number" />
        </FormField>
      </div>
      <FormField label="Kategoriya">
        <Input value={category} onChange={setCategory} placeholder="Kategoriya..." />
      </FormField>
    </Modal>
  );
}
