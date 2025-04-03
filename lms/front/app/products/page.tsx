import ProductsForm from "@/common/components/products"
import getProducts from "../common/action/products.api";


export default async function ProductsPage() {
  const Products = await getProducts();
  return (

    <div>
      <ProductsForm Products={Products}/>
    </div>)
} 