"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/common/ui/Button";
import { DeleteIcon } from "@/common/icons";
import { EditIcon } from "@/common/icons";
import DeleteConfirmationModal from "@/common/ui/DeleteConfirmationModal";
import { deleteProduct } from "@/common/action/products.api";




export default function ProductsForm({Products}) {
 console.log("Products..............",Products)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const handleDelete = async() => {
    await deleteProduct(selectedId)
    setIsDeleteModalOpen(false)
    setSelectedId(null)
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl p-2">
          {" "}
          Product Management{" "}
        </h1>
        <button>
          <Link href="/products/add" className="custom-primary-btn">
            Add Product
          </Link>
        </button>
      </div>

      <hr className="my-5" />

      <div className="mt-20">
        <table className="custom-table">
          <thead className="border-y-2 border-gray-400">
            <tr>
              <th> Sr. No.</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 font-medium text-lg text-center">
            {Products.map((Product, key) => (
              <tr key={Product.id}>
                <td>{key + 1}</td>
                <td>{Product.name}</td>
                <td>{Product.description}</td>
                <td>{Product.price}</td>
                <td className="flex items-center gap-x-3">
                  <Link
                    href={`/products/edit/${Product.id}`}
                    className="w-fit"
                  >
                    <EditIcon />
                  </Link>
                  <Button
                    className="bg-transparent p-0 px-2 border-none text-red-500"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedId(Product.id);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            setIsOpen={setIsDeleteModalOpen}
            onCancel={() => setIsDeleteModalOpen(false)}
            handleConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
};