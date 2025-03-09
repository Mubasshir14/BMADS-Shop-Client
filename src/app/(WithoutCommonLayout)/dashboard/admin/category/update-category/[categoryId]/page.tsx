import UpdateCategoryForm from "@/components/Modules/Category/UpdateCategoryForm";
import { getSingleCategory } from "@/components/services/Category";
import React from "react";

const UpdateCategory = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const { data: category } = await getSingleCategory(categoryId);

  return (
    <div>
      <UpdateCategoryForm category={category} />
    </div>
  );
};

export default UpdateCategory;
