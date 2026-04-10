// import { MOCK_PRODUCTS } from "@/lib/mock-data";
import ProductsClient from "@/components/products/ProducClient";
import { productsApi } from "@/lib/api";

export default async function ProductsPage() {
  const response = await productsApi.getAll(1);
  const products = response.data.data;
  return (
    <ProductsClient initialProducts={products} />
  );
}
