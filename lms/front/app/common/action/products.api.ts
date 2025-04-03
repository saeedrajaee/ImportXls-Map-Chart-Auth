"use server";

import { deleted, get, getUnique, patch, post } from "@/common/util/fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createProduct(_prevState: any, formData: FormData) {
  const { error } = await post("products", formData);
  if (error) {
    return { error };
  }
  redirect("/products");
}

export default async function getProducts(){
 const products = await get("products")
    return products;
}

export async function getUniqueProduct(id: string) {
  const product = await getUnique("products",id)
  return product;
}

export async function updateProduct( formData: FormData, id: string) {
  const error = await patch("products",formData,id)
  revalidatePath("/products", "page");
  redirect("/products");
  if (error) {
    return { error };
  }
  };

  export async function deleteProduct(id: string) {
    const error = await deleted("products",id)
    revalidatePath("/products", "page");
    redirect("/products");
    if (error) {
      return { error };
    }
  }