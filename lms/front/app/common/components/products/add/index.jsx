"use client";

import { createProduct } from "../../../action/products.api";
import { Button } from "@/common/ui/Button";
import { Input } from "@/common/ui/Input";
import Label from "@/common/ui/Label";
import { useFormState } from "react-dom";

export default function AddProduct({ searchParams }) {
    const { errorMessage } = searchParams;
    const [state, formAction] = useFormState(createProduct, { error: "" });


    return (
        <div>
            <h1 className="text-3xl font-semibold p-2"> Add Product </h1>

            <form
                className="grid gap-x-6 gap-y-10 mt-10 grid-cols-2 px-2"
                action={formAction}
            >
                {
                    errorMessage && (
                        <div
                            className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 w-fit"
                        >
                            <span
                                className="text-red-500 col-span-2 text-mg my-0 font-500"
                            >{errorMessage}</span>
                        </div>
                    )
                }
                <div className="grid gap-2">
                    <Label required={true}>Product Name</Label>
                    <Input placeholder="Enter Product Name" name="name" />
                </div>
                <div className="grid gap-2">
                    <Label required={true}>Description</Label>
                    <Input placeholder="Enter Description" name="description" />
                </div>
                <div className="grid gap-2">
                    <Label required={true}>Price</Label>
                    <Input placeholder="Enter Price" name="price" />
                </div>
                <div className="grid gap-2">
                </div>

                <Button className="w-52 col-span-2 mt-2">Submit</Button>
            </form>
        </div>
    )
}