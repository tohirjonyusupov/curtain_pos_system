import { notFound } from "next/navigation";
import ProductFormPage from "@/components/products/ProductFormPage";
import { productsApi } from "@/lib/api";
import { Product } from "@/lib/types";

interface Props {
  params: Promise<{ id: number }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const response = await productsApi.getById(Number(id), 1);
  const product: Product | null = response.data.data;
  // console.log(typeof Number(id));
  

  if (!product) {
    notFound();
  }

  return <ProductFormPage mode="edit" storeId={1} product={product} />;
}
