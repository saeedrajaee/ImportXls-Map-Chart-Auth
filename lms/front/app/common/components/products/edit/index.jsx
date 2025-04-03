"use client";

import { updateProduct } from "../../../action/products.api";
import { Button } from "@/common/ui/Button";
import { Input } from "@/common/ui/Input";
import Label from "@/common/ui/Label";

export default function EditProduct({ product, searchParams }) {
  const { errorMessage } = searchParams;

  return (
    <div>
      <h1 className="text-3xl font-semibold p-2"> Edit Product </h1>

      <form
        className="grid gap-x-6 gap-y-10 mt-10 grid-cols-2 px-2"
        action={(formData) => updateProduct(formData, product.id)}
      >
        {errorMessage && (
          <div className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 w-fit">
            <span className="text-red-500 col-span-2 text-mg my-0 font-500">
              {errorMessage}
            </span>
          </div>
        )}
        <div className="grid gap-2">
          <Label required={true}>Product Name</Label>
          <Input
            placeholder="Enter Product Name"
            name="name"
            defaultValue={product.name}
          />
        </div>
        <div className="grid gap-2">
          <Label required={true}>Description</Label>
          <Input
            placeholder="Enter Description"
            name="description"
            defaultValue={product.description}
          />
        </div>
        <div className="grid gap-2">
          <Label required={true}>price</Label>
          <Input
            placeholder="Enter price"
            name="price"
            defaultValue={product.price}
          />
        </div>
        <div className="grid gap-2"></div>

        <Button className="w-52 col-span-2 mt-2">Submit</Button>
      </form>
    </div>
  );
}
