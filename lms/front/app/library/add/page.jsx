import AddDoc from "../../common/components/library/add";
import React from "react";

export default function DocAddPage ({ searchParams }) {
  return (
    <div>
      <AddDoc searchParams={searchParams} />
    </div>
  );
};