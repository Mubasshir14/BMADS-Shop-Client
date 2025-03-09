import UpdateProductForm from "@/components/Modules/Products/UpdateProductForm";
import { getSingleProduct } from "@/components/services/Product";
import React from "react";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);

  return (
    <div>
      <UpdateProductForm product={product} />
    </div>
  );
};

export default UpdateProductPage;
