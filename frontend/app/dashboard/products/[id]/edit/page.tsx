import { notFound } from "next/navigation";
import ProductFormPage from "@/components/products/ProductFormPage";
import { productsApi } from "@/lib/api";
import { Product } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const response = await productsApi.getAll(1);
  const products = response.data.data as Product[];
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  return <ProductFormPage mode="edit" storeId={1} product={product} />;
}
