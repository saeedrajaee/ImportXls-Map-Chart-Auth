import { getUniqueProduct } from "@/common/action/products.api";
import EditProduct from "@/common/components/products/edit";

export default async function EditProductPage({ params, searchParams }) {
  const product = await getUniqueProduct(params.productId);

  return (
    <div>
      <EditProduct searchParams={searchParams} product={product} />
    </div>
  );
}
