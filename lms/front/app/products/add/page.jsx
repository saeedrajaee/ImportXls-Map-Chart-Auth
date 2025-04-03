import AddProduct from "../../common/components/products/add";
import React from "react";

export default function ProductAddPage ({ searchParams }) {
  return (
    <div>
      <AddProduct searchParams={searchParams} />
    </div>
  );
};